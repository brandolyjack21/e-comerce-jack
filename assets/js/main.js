import loader from './components/loader.js'
import showMenu from './components/showMenu.js'
import showCart from './components/showCart.js'
import getProducts from './helpers/getProducts.js'
import cart from './components/cart.js'
import product from './components/product.js'

loader()

showMenu()

showCart()

/* End UI Element */

/* Products */
const { db, printProduct } = product(await getProducts())

/* Carrito */
cart(db, printProduct)

