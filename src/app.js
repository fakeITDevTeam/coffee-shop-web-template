document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Espresso Italiano - All Day Gourmet Fresh Roasted Coffee', img: '1.jpg', price: 20000 },
      { id: 2, name: 'New Orleans Blend - Fresh Roasted', img: '2.jpg', price: 25000 },
      { id: 3, name: 'Costa Rican Tarrazu - Fresh Roasted', img: '3.jpg', price: 30000 },
      { id: 4, name: 'Colombian - Fresh Roasted', img: '4.jpg', price: 35000 },
      { id: 5, name: 'Ethiopian Yirgacheffe - Fresh Roasted', img: '5.jpg', price: 40000 },
      { id: 6, name: 'Tanzanian Peaberry - Fresh Roast', img: '6.jpg', price: 40000 }
    ]
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // check if there are no similar items in cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // if there are no similar items / the cart is empty
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // if there are similar items, check if the items are similar 
        this.items = this.items.map((item) => {
          // if the items are different
          if (item.id !== newItem.id) {
            return item;
          } else {
            // if there is similar item in the cart, add it as quantity and total of the item in the cart
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        })
      }
    },
    remove(id) {
      // remove item by id
      const cartItem = this.items.find((item) => item.id === id);
      // if item qty more than 1
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          // if the item id is not similar
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        // if the left item is 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});


// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};