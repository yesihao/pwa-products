import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Filter from '../containers/Filter.js'
import Pagination from '../components/Pagination.js'
import styles from './Products.scss'

export default class Products extends PureComponent {
  render() {
    const { products, page, pageSize, total, pageToAndReload } = this.props
    return (
      <div>
        <Filter />
        <div className="flex">
          { products.map(product =>
            <div key={product.id} className={styles.product}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={product.images[0].src} alt="featured image" />
                  </figure>
                </div>
                <p className="card-header-title">
                  <span className={styles.title}>
                    {product.name}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
        <Pagination totalPages={Math.ceil(total / pageSize)} currentAt={page} onPage={pageToAndReload} />
      </div>
    )
  }
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,

  pageToAndReload: PropTypes.func.isRequired,
}
