export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return Response.json({ resolvedUrl: null }, { status: 400 });
    }

    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return Response.json({ resolvedUrl: res.url || url });
  } catch (error) {
    return Response.json({ resolvedUrl: null, error: String(error) }, { status: 500 });
  }
}
