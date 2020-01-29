import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import {injectIntl} from 'react-intl'
import TransactionTable from './TransactionTableContainer'
import OnlyTitle from './shared/OnlyTitle'

const panelHeader = (title) => (
  <OnlyTitle title={title} />
)

class Transactions extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
      <div className="container-fluid">
        <Panel header={panelHeader(formatMessage({id: 'transactions'}))}>
          <TransactionTable usePaging showLedger compact={false} limit={20} />
        </Panel>
      </div>
    )
  }
}

export default injectIntl(Transactions)
