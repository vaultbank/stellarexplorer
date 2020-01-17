import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import {injectIntl} from 'react-intl'
import PaymentTable from './PaymentTable'

class Payments extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
      <div className="container-fluid">
        <Row>
          <Panel header={formatMessage({id: 'payments'})}>
            <PaymentTable compact={false} limit={50} usePaging />
          </Panel>
        </Row>
      </div>
    )
  }
}

export default injectIntl(Payments)
