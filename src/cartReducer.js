export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'emptyCart': {
      return [];
    }
    case 'add': {
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...cart, { id, sku, quantity: 1 }];
      }
    }
    case 'updateQuantity': {
      const { sku, quantity } = action;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    default:
      throw new Error('unhandled action ' + action.type);
  }
}
