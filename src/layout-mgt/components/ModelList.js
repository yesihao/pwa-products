import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './ModelList.scss'
import Pagination from '../../components/Pagination'
import { TYPE_MAP, CLASSFICATION_MAP, STATUS_MAP } from '../common/maps'

export default class ModelList extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { models, page, pageTo } = nextProps
    if (models.length <= 0 && page > 1) {
      pageTo(page - 1)
    }
  }

  render() {
    const { models, page, pageSize, total, order, pageTo, changeOrder, editModel, deleteModel, changePageSize } = this.props

    return (
      <div>
        <div className={styles.listContainer}>
          { total > 0 ?
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th className="has-text-centered">名称</th>
                  <th className="has-text-centered">大类</th>
                  <th className="has-text-centered">小类</th>
                  <th className="has-text-centered">入口</th>
                  <th className="has-text-centered">状态</th>
                  <th className="has-text-centered">
                    <label>创建时间</label>
                    <span className={classnames(styles.orderBtn, 'icon', 'is-small', {'has-text-info' : order && order.k === 'createTime'})}
                      onClick={changeOrder.bind(null, 'createTime')}>
                      <i className={`fa fa-chevron-${order && order.k === 'createTime' && order.v === 'asc' ? 'up' : 'down'}`} aria-hidden="true"></i>
                    </span>
                  </th>
                  <th className="has-text-centered">
                    <label>最后编辑时间</label>
                    <span className={classnames(styles.orderBtn, 'icon', 'is-small', {'has-text-info' : order && order.k === 'updateTime'})}
                      onClick={changeOrder.bind(null, 'updateTime')}>
                      <i className={`fa fa-chevron-${order && order.k === 'updateTime' && order.v === 'asc' ? 'up' : 'down'}`} aria-hidden="true"></i>
                    </span>
                  </th>
                  <th className="has-text-centered">操作</th>
                </tr>
              </thead>
              <tbody>
                {
                  models.map(model =>
                    <tr key={model.id}>
                      <td className="has-text-centered is-middle">{model.name}</td>
                      <td className="has-text-centered is-middle">{TYPE_MAP[model.function]}</td>
                      <td className="has-text-centered is-middle">{CLASSFICATION_MAP[model.classification]}</td>
                      <td className="has-text-centered is-middle">{model.entranceName}</td>
                      <td className="has-text-centered is-middle">{STATUS_MAP[model.status]}</td>
                      <td className="has-text-centered is-middle">{model.createTimeString}</td>
                      <td className="has-text-centered is-middle">{model.updateTimeString}</td>
                      <td className="has-text-centered is-middle">
                        <div className="field has-addons has-addons-centered">
                          {
                            model.status === 2 && model.function !== 'decoration' &&
                            <p className="control"><a className="button is-small" onClick={() => editModel(model.id, true)}>查看</a></p>
                          }
                          {
                            model.function !== 'decoration' &&
                            <p className="control">
                              <a className="button is-small" onClick={() => editModel(model.id)}>编辑</a>
                            </p>
                          }
                          <p className="control">
                            <a className="button is-small" onClick={() => deleteModel(model.id, model.entranceId)}>删除</a>
                          </p>
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            :
            <div className="level">
              <h1 className={classnames('level-item', 'title', 'is-4', 'has-text-grey-light', styles.title)}>当前分类下，搜索无结果</h1>
            </div>
          }
        </div>

        <div>
          <Pagination totalPages={Math.ceil(total / pageSize)}
            totalItems={total}
            size="small"
            currentAt={page}
            onPage={pageTo}
            pageSizes={[10, 15, 20, 25, 30]}
            pageSize={pageSize}
            onChangePageSize={changePageSize}
          />
        </div>
      </div>
    )
  }
}

ModelList.propTypes = {
  order: PropTypes.object,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  models: PropTypes.array.isRequired,

  changeOrder: PropTypes.func.isRequired,
  pageTo: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  editModel: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,
}
