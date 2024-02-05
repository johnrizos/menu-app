export default function price() {

    function numberPriceToText(price) {
        return Number(price).toFixed(2).toString().replace(".", ",");
    }

    function textPriceToNumber(price) {

        const replacedPrice = price.replace(",", ".");
    
        const number = parseFloat(replacedPrice);
        const roundedNumber = Math.round(number * 100) / 100;
        return roundedNumber;
    }
    
    function calculateNumberPriceAndQuantity(price, quantity){
        return (price * quantity).toFixed(2).toString().replace(".", ",");
    
    }
    
    function totalProductPrice(price,quantity){
            return calculateNumberPriceAndQuantity(textPriceToNumber(price), quantity)
    

    }


    return {numberPriceToText,calculateNumberPriceAndQuantity,totalProductPrice}
}