export default function price() {
  function numberPriceToText(price) {
    if (price === undefined || price === null || price === "") return "0,00";
    else if (typeof price === "string") return price;
    return Number(formatToTwoDecimals(price)).toString().replace(".", ",");
  }

  function textPriceToNumber(price) {
    if (price === undefined || price === null || price === "") return 0.00;
    if (typeof price === "number") return price;

    const replacedPrice = price.replace(",", ".");

    const number = parseFloat(replacedPrice);
    const roundedNumber = Math.round(number * 100) / 100;
    return roundedNumber;
  }

  function formatToTwoDecimals(number) {
    return number.toFixed(2);
}

  function calculateNumberPriceAndQuantity(price, quantity) {
    return formatToTwoDecimals(price * quantity).toString().replace(".", ",");
  }

  function priceForExtras(productGroupOfExtras, checkboxRadioDataInputs) {
    let extrasPrice = Number(0.00);
    if (Object.entries(checkboxRadioDataInputs).length !== 0 || productGroupOfExtras.value) {
      for (const key in checkboxRadioDataInputs) {
          productGroupOfExtras.value.forEach((productGroupOfExtra) => {
            // check if the productGroupOfExtra.id is the same as the key of the checkboxRadioDataInputs
            if (Number(productGroupOfExtra.id) === Number(key)) {
              if ( productGroupOfExtra.extras && productGroupOfExtra.extras.length > 0 ) {
                productGroupOfExtra.extras.forEach((extra) => {
                  if (checkboxRadioDataInputs[key].includes(Number(extra.id))) {
                    extrasPrice += Number(extra.price_adjustment);
                  }
                });
              } else {
                console.log("something went wrong with the extras");
              }
            }
          });
        
      }
    }

    console.log("extrasPrice: ", extrasPrice);
    return extrasPrice;
  }

  function totalProductPrice(price, quantity) {
    return calculateNumberPriceAndQuantity(textPriceToNumber(price), quantity);
  }

  return {
    numberPriceToText,
    calculateNumberPriceAndQuantity,
    textPriceToNumber,
    priceForExtras,
    formatToTwoDecimals,
    totalProductPrice,

  };
}
