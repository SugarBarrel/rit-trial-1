

export function extract_id(url: string) {
  let parts = url.split('/');
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i]) return +parts[i];
  }
  return null;
}
