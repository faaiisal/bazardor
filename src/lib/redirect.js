export function safeReturnTo(value, fallback = "/") {
  if (typeof value !== "string" || !value.startsWith("/")) {
    return fallback;
  }

  const baseUrl = "https://bazardor.invalid";
  const target = new URL(value, baseUrl);
  if (target.origin !== baseUrl) return fallback;
  return `${target.pathname}${target.search}${target.hash}`;
}
