import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import {injectIntl} from 'react-intl'
import TradeTable from './TradeTable'
import OnlyTitle from './shared/OnlyTitle'

const panelHeader = (title) => (
  <OnlyTitle title={title} />
)
class Trades extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
        <div className="container-fluid">
          <Panel header={panelHeader(formatMessage({id: 'trades'}))}>
            <TradeTable limit={50} usePaging />
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Trades)
