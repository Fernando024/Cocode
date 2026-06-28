export async function safeFetch(fn, fallback = null) {
  try {
    return await fn();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[safeFetch]", error?.message ?? error);
    }
    return fallback;
  }
}
