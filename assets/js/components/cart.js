function cart(db, printProducts) {

  let cart = []

  // Elemento del DOM
  const productsDOM = document.querySelector('.container--products--all')
  const notifyDOM = document.querySelector('.notify')
  const cartDOM = document.querySelector('.cart__body')
  const countDOM = document.querySelector('.text--buy')
  const totalDOM = document.querySelector('.text--buy--costo')
  const checkoutDOM = document.querySelector('.btn--buy')

  // Funciones
  function printCart() {
    let htmlCart = ''

    if (cart.length === 0) {
      htmlCart += `
      <span class="product__alert">
        <i class='bx bx-cart' ></i>
        no hay productos en el carrito
      </span>
      `
      notifyDOM.classList.remove('notify--hidden')
    } else {
      for (const item of cart) {
        const product = db.find(p => p.id === item.id)
        htmlCart += `
          <div class="cart__container--mini">
          <div class="container__img--mini">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="contenedor--minis">
            <h3 class="title--mini">${product.name}</h3>
          <div class="description--mini">
            <span>$${product.price}</span>
            <div class="btn--minis">
              <button class="article__quantity-btn article--minus" data-id="${item.id}"><i class='bx bx-minus'></i></button>
            <span>${item.qty}</span>
            <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}"><i class='bx bx-plus' ></i></button>
            </div>
            <button type="button" class="article__btn remove-from-cart" data-id="${item.id}><i class='bx bx-trash-alt'></i></button>
          </div>
          </div>
        </div>
        `
      }
      notifyDOM.classList.add('notify--hidden')
    }

    cartDOM.innerHTML = htmlCart
    notifyDOM.innerHTML = showItemsCount()
    countDOM.innerHTML = showItemsCount()
    totalDOM.innerHTML = showTotal()
  }

  function addToCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)

    if (itemFinded) {
      itemFinded.qty += qty
    } else {
      cart.push({id, qty})
    }
    printCart()
  }

  function removeFromCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)
    const result = itemFinded.qty - qty

    if (result > 0) {
      itemFinded.qty -= qty
    } else {
      cart = cart.filter(i => i.id !== id)
    }
    
    printCart()
  }

  function deleteFromCart(id) {
    cart = cart.filter(i => i.id !== id)
    printCart()
  }

  function showItemsCount() {
    let suma = 0
    for (const item of cart) {
      suma += item.qty
    }
    return suma
  }

  function showTotal() {
    let total = 0
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      total += item.qty * productFinded.price
    }
    
    return total
  }

  function checkout() {
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      productFinded.quantity -= item.qty
    }

    cart = []
    printCart()
    printProducts()
    window.alert('Gracias por su compra')
  }
  
  printCart()
  // Eventos
  productsDOM.addEventListener('click', function (e) {
    if (e.target.closest('.btn__cart--plus')) {
      const id = +e.target.closest('.btn__cart--plus').dataset.id
      addToCart(id)
    }
  })

  cartDOM.addEventListener('click', function (e) {

    if (e.target.closest('.article--minus')) {
      const id = +e.target.closest('.article--minus').dataset.id
      removeFromCart(id)
    }

    if (e.target.closest('.article--plus')) {
      const id = +e.target.closest('.article--plus').dataset.id
      addToCart(id)
    }

    if (e.target.closest('.remove-from-cart')) {
      const id = +e.target.closest('.remove-from-cart').dataset.id
      deleteFromCart(id)
    }

  })

  checkoutDOM.addEventListener('click', function () {
    checkout()
  })
}

export default cart