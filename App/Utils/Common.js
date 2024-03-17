export function formatMoney(number) {
  return number?.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}
