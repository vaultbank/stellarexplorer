import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import {injectIntl} from 'react-intl'
import TransactionTable from './TransactionTableContainer'

class Transactions extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
      <div className="container-fluid">
        <Row>
          <Panel header={formatMessage({id: 'transactions'})}>
            <TransactionTable usePaging showLedger compact={false} limit={20} />
          </Panel>
        </Row>
      </div>
    )
  }
}

export default injectIntl(Transactions)
