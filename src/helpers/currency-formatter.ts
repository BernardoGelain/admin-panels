/**
 * Format number to any currency (angola default)
 * @param value - Number to be formatted
 * @returns Formatted currency (AKZ 1.000,00)
 */
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  }).format(value);
}
