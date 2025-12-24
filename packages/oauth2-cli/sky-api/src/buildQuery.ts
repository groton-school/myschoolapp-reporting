export function buildQuery(params: Record<string, unknown>) {
  const search = new URLSearchParams();
  for (const key in params) {
    search.append(key, `${params[key]}`);
  }
  return search.toString();
}
