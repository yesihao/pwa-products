import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatDate } from 'tjs'
import { Link } from 'react-router-dom'

import urls from '../../urls.js'
import { PLAN_STATUS_MAP } from '../common/maps.js'
const TAG_STYLE_MAP = {
  0: 'is-light',
  1: 'is-light',
  2: 'is-light',
  3: 'is-link',
  4: 'is-warning',
}
const MODEL_TO_EDIT = 1
const PLAN_TO_UPDATE = 4
const PLAN_TO_ONLINE = 2

export default class ShowAll extends PureComponent {
  render() {
    const { plans, submit } = this.props

    return (
      <div className="column">
        <div className="tile is-ancestor field is-grouped is-grouped-multiline">
          { plans.map(x => (
            <div key={x.id} className="tile is-parent is-6">
              <div className="tile box">
                <div className="tile media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src={x.thumbUrl} />
                    </p>
                  </figure>
                  <div className="media-content is-clearfix">
                    <div className="level is-marginless">
                      <div className="level-left">
                        <h1 className="title is-5 level-item">{x.name}</h1>
                      </div>
                      <div className="level-right">
                        <div className="tags has-addons level-item">
                          <span className={`tag ${TAG_STYLE_MAP[x.status]}`}>{PLAN_STATUS_MAP[x.status]}</span>
                        </div>
                      </div>
                    </div>
                    <p className="content"></p>
                    <div className="level is-size-7 has-text-grey">
                      <div className="level-left">
                        <span className="level-item">主题</span>
                        <div className="tags level-item">
                          <span className="tag">{x.theme}</span>
                        </div>
                      </div>
                    </div>
                    <p className="content">
                      <span className="has-text-link">{x.entranceNum}</span>&nbsp;个入口，<span className="has-text-link">{x.modelNum}</span>&nbsp;个模型
                    </p>
                    <p className="content is-size-7 has-text-right has-text-grey-light">
                      最后修改时间：{formatDate(new Date(x.updateTime*1000), 'yyyy-MM-dd HH-mm-ss')}
                    </p>
                    <div className="field is-grouped is-pulled-right">
                      { x.status === PLAN_TO_ONLINE && x.toEditModelNum === 0 &&
                        <div className="control">
                          <a className="button is-link is-outlined" onClick={() => submit(x.id)}>申请上线</a>
                        </div>
                      }
                      { x.status === PLAN_TO_UPDATE && x.toEditModelNum === 0 &&
                        <div className="control">
                          <a className="button is-link is-outlined" onClick={() => submit(x.id, true)}>申请变更</a>
                        </div>
                      }
                      { x.toEditModelNum > 0 &&
                        <div className="control">
                          <Link className="button is-primary is-outlined" to={urls.layoutmgtDetails(x.id, MODEL_TO_EDIT)}>
                            待编辑模型({x.toEditModelNum})
                          </Link>
                        </div>
                      }
                      <div className="control">
                        <Link className="button is-primary is-outlined" to={urls.layoutmgtDetails(x.id)}>查看</Link>
                      </div>
                      <div className="control">
                        <Link className="button is-primary is-outlined" to={urls.layoutmgtGroundSigns(x.id)}>地贴管理</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) }
        </div>
      </div>
    )
  }
}

ShowAll.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    entranceNum: PropTypes.number.isRequired,
    modelNum: PropTypes.number.isRequired,
    toEditModelNum: PropTypes.number.isRequired,
    theme: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
    updateTime: PropTypes.number.isRequired,
  })).isRequired,

  submit: PropTypes.func.isRequired,
}
