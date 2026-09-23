function isValidQuantity(quantity) {
  return quantity > 0 && quantity <= 20;
}

function calculateTicketPrice(quantity, basePrice, premium) {
  let price = quantity * basePrice;

  if (quantity >= 5) {
    price = price * 0.9;
  }

  if (premium) {
    price = price * 1.5;
  }

  price = price - 10;

  return Math.round(price);
}

module.exports = { isValidQuantity, calculateTicketPrice };