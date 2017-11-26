import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { DISPLAY_MAP, STATUS_MAP, TYPE_MAP } from '../common/maps'

export default class ModelListFilters extends PureComponent {
  updateName = (e) => {
    const { updateFilters } = this.props
    updateFilters('name', e.target.value)
  }
  updateKeyword = () => {
    const { name, updateFilters } = this.props
    updateFilters('keyword', name.toLowerCase())
  }

  update = (k, isNum) => {
    const { updateFilters } = this.props
    return (e) => updateFilters(k, isNum ? parseInt(e.target.getAttribute('data-value')) : e.target.getAttribute('data-value'))
  }
  updateDisplay = (e) => {
    const { entrances, entrance, updateFilters } = this.props
    let val = e.target.getAttribute('data-value')

    if (val === 'view' && entrance === '') {
      updateFilters('entrance', entrances[0].id)
    }
    updateFilters('display', val)
  }
  updateType = this.update('type')
  updateEntrance = this.update('entrance')
  updateStatus = this.update('status', true)

  render() {
    const { display, name, type, entrance, entrances, status, resetFilters } = this.props

    return (
      <div className="columns">
        <div className="column is-3">
          <div className="field is-grouped">
            <p className="control">
              <input value={name} onChange={this.updateName} className="input is-small" types="text" placeholder="搜索模型名称" />
            </p>
            <p className="control">
              <a className="button is-small is-warning" onClick={this.updateKeyword}>搜索</a>
            </p>
          </div>
        </div>
        <div className="column is-7">
          <div className="columns">
            <div className="column">
              <span className="icon">
                <i className="fa fa-map-o" aria-hidden="true"></i>
              </span>
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu3">
                    <span className="icon is-small">
                      <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </span>
                    <span>{DISPLAY_MAP[display]}</span>
                  </button>
                </div>
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a className="dropdown-item is-size-7" data-value="table" onClick={this.updateDisplay}>
                      {DISPLAY_MAP['table']}
                    </a>
                    {
                      entrances.length > 0 &&
                      <a className="dropdown-item is-size-7" data-value="view" onClick={this.updateDisplay}>
                        {DISPLAY_MAP['view']}
                      </a>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <span className="icon">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </span>
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu3">
                    <span className="icon is-small">
                      <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </span>
                    <span>{entrance ? entrances.find(e => e.id === entrance).name : '全部'}</span>
                  </button>
                </div>
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    {
                      display !== 'view' &&
                      <a className="dropdown-item is-size-7" data-value="" onClick={this.updateEntrance}>
                        全部
                      </a>
                    }
                    {
                      entrances.map(etr =>
                        <a key={etr.id} className="dropdown-item is-size-7" data-value={etr.id} onClick={this.updateEntrance}>
                          {etr.name}
                        </a>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <span className="icon">
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </span>
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu3">
                    <span className="icon is-small">
                      <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </span>
                    <span>{status ? STATUS_MAP[status] : '全部'}</span>
                  </button>
                </div>
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a className="dropdown-item is-size-7" data-value="0" onClick={this.updateStatus}>
                      全部
                    </a>
                    <a className="dropdown-item is-size-7" data-value="1" onClick={this.updateStatus}>
                      {STATUS_MAP[1]}
                    </a>
                    <a className="dropdown-item is-size-7" data-value="2" onClick={this.updateStatus}>
                      {STATUS_MAP[2]}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <span className="icon">
                <i className="fa fa-cube" aria-hidden="true"></i>
              </span>
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu3">
                    <span className="icon is-small">
                      <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </span>
                    <span>{type ? TYPE_MAP[type] : '全部'}</span>
                  </button>
                </div>
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a className="dropdown-item is-size-7" data-value="" onClick={this.updateType}>
                      全部
                    </a>
                    <a className="dropdown-item is-size-7" data-value="exhibition" onClick={this.updateType}>
                      {TYPE_MAP['exhibition']}
                    </a>
                    <a className="dropdown-item is-size-7" data-value="decoration" onClick={this.updateType}>
                      {TYPE_MAP['decoration']}
                    </a>
                    <a className="dropdown-item is-size-7" data-value="marketing" onClick={this.updateType}>
                      {TYPE_MAP['marketing']}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-2">
          <a className="button is-small" onClick={resetFilters}>重置</a>
        </div>
      </div>
    )
  }
}

ModelListFilters.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  entrance: PropTypes.string.isRequired,
  entrances: PropTypes.array.isRequired,
  status: PropTypes.number.isRequired,

  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
}
