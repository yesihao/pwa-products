import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './Product.scss'

export default class Product extends PureComponent {
  render() {
    const { name, image, categories, images, attributes } = this.props

    return (
      <div className={styles.container}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={image} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">
              {
                categories.map(c =>
                  <span key={c.id}>{c.name}</span>
                )
              }
              {attributes[0]}
            </p>
          </div>
        </div>

        {
          images.map(img =>
            <div key={img.id} className="card-image">
              <figure className="image">
                <img src={img.src} alt="image" />
              </figure>
            </div>
          )
        }

      </div>
    )
  }
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  attributes: PropTypes.array.isRequired,
}
