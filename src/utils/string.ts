export function formatNumber(value?: number): string {
  if (!value) {
    return "N/A";
  }
  return new Intl.NumberFormat("en-ie").format(value);
}
