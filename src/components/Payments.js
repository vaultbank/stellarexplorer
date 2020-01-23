import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import {injectIntl} from 'react-intl'
import PaymentTable from './PaymentTable'
import OnlyTitle from './shared/OnlyTitle'

const panelHeader = (title) => (
  <OnlyTitle title={title} />
)

class Payments extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
        <div className="container-fluid">
          <Panel header={panelHeader(formatMessage({id: 'payments'}))}>
            <PaymentTable compact={false} limit={50} usePaging />
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Payments)
