export default function validateCreditCard(creditCardNumber) {
    const cleanedNumber = creditCardNumber.replace(/\s+|-/g, '');

    const cardBrands = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
      dinersclub: /^3(?:0[0-5]|[68])/,
      jcb: /^(?:2131|1800|35)/,
    };
  
    let cardBrand = 'Unknown';
    let isCreditCardValid = false;
  
    for (const brand in cardBrands) {
      if (cardBrands[brand].test(cleanedNumber)) {
        cardBrand = brand;
        break;
      }
    }
  
    if (validateLuhnAlgorithm(cleanedNumber)) {
      isCreditCardValid = true;
    }
  
    const brandNameOfCreditCard = "";
    // if (isCreditCardValid && cardBrand !== 'Unknown') {
    //   brandNameOfCreditCard.textContent = 'Card brand: ' + cardBrand.toUpperCase() + '. Valid credit card number.';
    //   brandNameOfCreditCard.classList.remove('error');
    // brandNameOfCreditCard = cardBrand.toUpperCase();
    // } else {
    //   brandNameOfCreditCard.textContent = 'Invalid credit card number.';
    //   brandNameOfCreditCard.classList.add('error');
    // brandNameOfCreditCard = cardBrand.toUpperCase();

    // }

    return {"cardBrand":cardBrand,"isCreditCardValid":isCreditCardValid};
  }
  
  function validateLuhnAlgorithm(number) {
    let sum = 0;
    let isAlternate = false;
  
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);
  
      if (isAlternate) {
        digit *= 2;
        if (digit > 9) {
          digit = (digit % 10) + 1;
        }
      }
  
      sum += digit;
      isAlternate = !isAlternate;
    }
  
    return sum % 10 === 0;
  }
  