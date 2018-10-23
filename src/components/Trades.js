import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import { injectIntl } from 'react-intl'
import TradeTable from './TradeTable'

class Trades extends React.Component {
  render() {
    const { formatMessage } = this.props.intl
    return (
      <div className="container-fluid">
        <Row>
          <Panel header={formatMessage({ id: 'trades' })}>
            <TradeTable limit={50} usePaging />
          </Panel>
        </Row>
      </div>
    )
  }
}

export default injectIntl(Trades)
