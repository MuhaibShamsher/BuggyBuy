export const addDecimals = num => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
}

export const updateCart = (state) => {
    //Calculate items price
    const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price ?? 0) * (item.qty ?? 0),
        0
    )
    state.itemsPrice = addDecimals(itemsPrice)


    //Calculate shipping price, If order is over $100 then free, else $10 shipping
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)


    state.taxPrice = addDecimals(Number((15 / 100) * state.itemsPrice))


    state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
    )


    localStorage.setItem('cart', JSON.stringify(state))


    return state
}