function applyDiscounts(items) {
  let total = 0;
  let totalDiscount = 0;

  let countMap = {};

  items.forEach((item) => {
    countMap[item.product.name] =
      (countMap[item.product.name] || 0) + item.quantity;
  });

  items.forEach((item) => {
    const { name, price } = item.product;
    const qty = item.quantity;
    let discount = 0;
    let finalPrice = price * qty;

    if (name === "A" && qty >= 3) {
      let sets = Math.floor(qty / 3);
      discount = sets * (price * 3 - 85);
    }

    if (name === "B" && qty >= 2) {
      let sets = Math.floor(qty / 2);
      discount = sets * (price * 2 - 35);
    }

    item.discount = discount;
    item.price = price * qty - discount;

    total += item.price;
    totalDiscount += discount;
  });

  if (total > 150) {
    totalDiscount += 20;
    total -= 20;
  }

  return { items, totalPrice: total, totalDiscount };
}

module.exports = { applyDiscounts };
