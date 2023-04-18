

function loader() {
    window.addEventListener('load', function () {
        const loader = document.querySelector('.loader')
        loader.classList.add('loader--hidden')
        console.log('hola si soy')
    })
}

export default loader