import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage, injectIntl} from 'react-intl'
import PropTypes from 'prop-types'

import AccountLink from './shared/AccountLink'
import NewWindowIcon from './shared/NewWindowIcon'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'

import pools from '../data/inflation_pools.json'

const METADATA_PATH =
  'https://raw.githubusercontent.com/chatch/stellarexplorer/master/src/data/inflation_pools.json'

const Pool = ({account, name, website}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        <a href={website} target="_blank">
          {website} {' '}
          <NewWindowIcon />
        </a>
      </td>
      <td>
        <AccountLink account={account} hideKnown />
      </td>
    </tr>
  )
}

Pool.propTypes = {
  account: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
}

class Pools extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    const header = titleWithJSONButton(
      formatMessage({id: 'inflation.pools'}),
      METADATA_PATH
    )
    return (
        <div className="container-fluid">
          <Panel header={header}>
            <Table className="table-striped table-hover">
              <colgroup>
                <col width="200" />
                <col />
                <col width="150" />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="name" />
                  </th>
                  <th>
                    <FormattedMessage id="home" />
                  </th>
                  <th>
                    <FormattedMessage id="account" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(pools).map(key => {
                  const pool = pools[key]
                  return <Pool key={key} account={key} {...pool} />
                })}
              </tbody>
            </Table>
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Pools)
