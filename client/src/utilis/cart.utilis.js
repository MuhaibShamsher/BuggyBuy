export const addDecimals = num => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
}

export const updateCart = (state) => {
    const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price ?? 0) * (item.qty ?? 0),
        0
    )
    state.itemsPrice = addDecimals(itemsPrice)


    state.shippingPrice = addDecimals(state.itemsPrice > 50000 ? 0 : 1000)


    state.taxPrice = addDecimals(Number((5 / 100) * state.itemsPrice))


    state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
    )


    localStorage.setItem('cart', JSON.stringify(state))


    return state
}