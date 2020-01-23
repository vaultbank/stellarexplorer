import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import {injectIntl} from 'react-intl'
import OperationTable from './OperationTable'
import OnlyTitle from './shared/OnlyTitle'

const panelHeader = (title) => (
  <OnlyTitle title={title} />
)
class Operations extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
        <div className="container-fluid">
          <Panel header={panelHeader(formatMessage({id: 'operations'}))}>
            <OperationTable compact={false} limit={50} usePaging />
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Operations)
