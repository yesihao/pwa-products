function home() {
  return '/'
}

function products() {
  return '/products'
}

function product(id) {
  return `/products/${id}`
}

export default {
  home,
  products,
  product,
}
