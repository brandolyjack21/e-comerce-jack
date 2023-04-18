function cart() {
    const btnCart = document.querySelector('.btn--cart')
    const cart = document.querySelector('.cart')
    const btnCartClose = document.querySelector('.btn__cart--close')

    btnCart.addEventListener('click', function () {
        cart.classList.toggle('cart__open')
    })

    btnCartClose.addEventListener('click', function () {
        cart.classList.remove('cart__open')
    })
    
}

export default cart