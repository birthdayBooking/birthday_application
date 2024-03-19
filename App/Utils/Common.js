export function formatMoney(number) {
  return number?.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

export function ratingFormat(number) {
  const stringNumber = number?.toString(); // parse number to String
  if (typeof stringNumber === "string") {
    const array = stringNumber.split("."); //check after the dot have number or not
    if (array[1] === "0" || array[1] === "00" || array[1] === undefined) {
      return stringNumber;
    } else {
      const numericValue = parseFloat(stringNumber); // parse String to number
      return numericValue.toFixed(2);
    }
  }
  return stringNumber;
}
