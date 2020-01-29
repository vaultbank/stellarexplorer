import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import {injectIntl} from 'react-intl'
import LedgerTable from './LedgerTableContainer'
import OnlyTitle from './shared/OnlyTitle'

const panelHeader = (title) => (
  <OnlyTitle title={title} />
)

class Ledgers extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
        <div className="container-fluid">
          <Panel header={panelHeader(formatMessage({id: 'ledgers'}))}>
            <LedgerTable usePaging limit={20} />
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Ledgers)
