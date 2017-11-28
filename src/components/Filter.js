import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './Filter.scss'
// import search from '../assets/images/search.svg'

export default class Filter extends PureComponent {
  changeBrand = (e) => {
    const { updateFilter } = this.props
    updateFilter('brand', +e.target.value)
  }
  changeModel = (e) => {
    const { updateFilter } = this.props
    updateFilter('model', +e.target.value)
  }

  render() {
    const { brands, brand, model, models, pageToAndReload } = this.props

    return (
      <nav className={classnames('flex-centered-row', styles.navbar)}>
        <div className={classnames('flex-centered-row', styles.navbarItem)}>
          <span className={styles.label}>品牌</span>
          <div className={classnames('select', 'is-small')}>
            <select value={brand} onChange={this.changeBrand}>
              { brands.map(b =>
                <option key={b.id} value={b.id}>{b.name}</option>)
              }
            </select>
          </div>
        </div>
        <div className={classnames('flex-centered-row', styles.navbarItem)}>
          <span className={styles.label}>车系</span>
          <div className={classnames('select', 'is-small', styles.select)}>
            <select value={model} onChange={this.changeModel}>
              { models.map(m =>
                <option key={m.id} value={m.id}>{m.name}</option>)
              }
            </select>
          </div>
        </div>
        <button className={classnames('button', 'is-small', 'is-primary', styles.button)}
          disabled={brand < 0 && model < 0}
          onClick={() => pageToAndReload(1)}
        >快速查询</button>
        {/* <a className="icon is-medium">
          <img src={search} />
        </a> */}
      </nav>
    )
  }
}

Filter.propTypes = {
  brand: PropTypes.number.isRequired,
  brands: PropTypes.array.isRequired,
  model: PropTypes.number.isRequired,
  models: PropTypes.array.isRequired,

  updateFilter: PropTypes.func.isRequired,
  pageToAndReload: PropTypes.func.isRequired,
}
