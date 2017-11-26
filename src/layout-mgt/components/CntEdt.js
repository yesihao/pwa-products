import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Void from '../../components/Void.js'
import BscEdt from '../containers/BscEdt.js'
import digit2cn from '../../common/digit2cn.js'
import ImgUpld from '../../components/ImgUpld.js'

const ROW_ENUM = [3, 4]

export default class CntEdt extends PureComponent {
  render() {
    const {
      rows, totalRows, invalid, category,
      swchRows, chgCtg, slctRowItem, delRowItem,
    } = this.props

    return (
      <BscEdt editingType="cntEdt" invalid={invalid}>
        <div className="field">
          <label className="label">类目<span className="has-text-danger">*</span></label>
          <div className="control">
            <input className="input" type="text" placeholder="如8折，新品，199等（最多8个字）"
              maxLength={8}
              value={category}
              onChange={e => chgCtg(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">层数<span className="has-text-danger">*</span></label>
          <div className="field has-addons">
            { ROW_ENUM.map(n => (
              <div key={n} className="control">
                <a className={classnames('button', { 'is-link': totalRows === n })}
                  onClick={() => swchRows(n)}
                >
                  {digit2cn(n)}层
                </a>
              </div>
            )) }
          </div>
        </div>

        { rows && rows.map((r, rIdx) => (
          <Void key={rIdx}>
            <div className="field">
              <label className="label">第{digit2cn(rIdx+1)}层</label>
            </div>
            <div className="columns">
              { r.items.map((item, iIdx) => (
                <div key={iIdx} className="column is-4">
                  <ImgUpld url={item.thumb && item.thumb.url}
                    onClickAdd={() => slctRowItem(rIdx, iIdx)}
                    onClickDel={() => delRowItem(rIdx, iIdx)}
                  />
                </div>
              )) }
            </div>
          </Void>
        )) }
      </BscEdt>
    )
  }
}

CntEdt.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      thumb: PropTypes.shape({
        url: PropTypes.string
      }),
    })).isRequired,
  })),
  totalRows: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,

  swchRows: PropTypes.func.isRequired,
  chgCtg: PropTypes.func.isRequired,
  slctRowItem: PropTypes.func.isRequired,
  delRowItem: PropTypes.func.isRequired,
}
