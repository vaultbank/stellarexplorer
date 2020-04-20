import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage, injectIntl} from 'react-intl'
import isEmpty from 'lodash/isEmpty'

import {decentralized, centralized} from '../data/exchanges'
import AccountLink from './shared/AccountLink'
import Logo from './shared/Logo'
import NewWindowIcon from './shared/NewWindowIcon'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'

const METADATA_PATH =
  'https://raw.githubusercontent.com/chatch/stellarexplorer/master/src/data/exchanges.json'

const Exchange = ({accounts, home, name, logo, decentralized = false}) => {
  const homeLink = `https://${home}`
  return (
    <tr>
      <td className="ignore-responsive">
        <a href={homeLink} target="_blank">
          <Logo name={name} src={logo} width={150} />
        </a>
      </td>
      <td title="Home Domain">
        <a href={homeLink} target="_blank">
          {home} {' '}
          <NewWindowIcon />
        </a>
      </td>
      <td title="Account">
        {!isEmpty(accounts) &&
          accounts.map(account => (
            <span key={account}>
              <AccountLink account={account} hideKnown={true} />&nbsp;
            </span>
          ))}
        {isEmpty(accounts) && decentralized && <span>Decentralized</span>}
      </td>
    </tr>
  )
}

const TableHeader = () => (
  <thead>
    <tr>
      <th width="200" />
      <th>
        <FormattedMessage id="home.domain" />
      </th>
      <th width="300">
        <FormattedMessage id="account" />
      </th>
    </tr>
  </thead>
)

class Exchanges extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    const header = titleWithJSONButton(
      formatMessage({id: 'exchanges'}),
      METADATA_PATH
    )
    return (
        <div className="container-fluid">
          <Panel header={header}>
            <div className="m-20">
            <h5>Decentralized</h5>
            <div className="bordered">
            <Table className="table-striped table-hover tbl-responsive">
              <TableHeader />
              <tbody>
                {Object.keys(decentralized).map(id => (
                  <Exchange
                    key={id}
                    name={id}
                    {...decentralized[id]}
                    decentralized
                  />
                ))}
              </tbody>
            </Table>
            </div>
            </div>
            <div className="m-20">
            <h5>Centralized</h5>
            <div className="bordered">
            <Table className="table-striped table-hover">
              <TableHeader />
              <tbody>
                {Object.keys(centralized).map(id => (
                  <Exchange key={id} name={id} {...centralized[id]} />
                ))}
              </tbody>
            </Table>
            </div>
            </div>
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Exchanges)
