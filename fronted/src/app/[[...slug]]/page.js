import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { getAllPageSlugs, getPageBySlug, StrapiFetchError } from "@/lib/strapi";

const HOME_SLUG = "inicio";

function resolveSlug(slugParts) {
  if (!Array.isArray(slugParts) || slugParts.length === 0) return HOME_SLUG;
  return slugParts.join("/");
}

function toParamsObject(slug) {
  if (slug === HOME_SLUG) return { slug: undefined };
  return { slug: slug.split("/") };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs();
    return slugs.map((slug) => toParamsObject(slug));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[generateStaticParams] No se pudieron obtener los slugs:", error?.message ?? error);
    }
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug: slugParts } = await params;
  const slug = resolveSlug(slugParts);

  try {
    const page = await getPageBySlug(slug);
    if (!page?.Titulo) return {};
    return {
      title: page.Titulo,
      description: page.descripcion ?? undefined,
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }) {
  const { slug: slugParts } = await params;
  const slug = resolveSlug(slugParts);

  let page;
  try {
    page = await getPageBySlug(slug);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Page] Error al obtener "${slug}":`, error?.message ?? error);
    }
    if (error instanceof StrapiFetchError) notFound();
    notFound();
  }

  if (!page || !Array.isArray(page.bloques)) notFound();

  return (
    <article>
      <BlockRenderer bloques={page.bloques} />
    </article>
  );
}
