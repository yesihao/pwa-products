function home() {
  return '/'
}

function products() {
  return '/products'
}

function product(id) {
  return `/product/${id}`
}

export default {
  home,
  products,
  product,
}
