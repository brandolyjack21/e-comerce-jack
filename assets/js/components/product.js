function product(products) {
    const db = [...products] 

    function printProduct() {
        const productDom = document.querySelector('.container--products--all')

        let htmlProduct = ''

       for (const product of db) {
        htmlProduct += `<div class="product--container">
        <article class="product">
        <div class="container__img">
          <img src="${product.image}" alt="">
        </div>
        
        <div class="container__description">
          <button type="button" class="btn__cart--plus data-id="${product.id}">
            <i class='bx bxs-cart-add' ></i>
          </button>
           <div class="container--span">
            <span class="description__price">${product.price}</span>
            <span class="description__stock">disponibles: ${product.quantity}</span>
           </div>
            <h3>${product.name}</h3>
        </div>
      </article>
      </div>`
       }
       productDom.innerHTML = htmlProduct
    }

    printProduct()

    return {
        db,
        printProduct
      }
}

export default product
