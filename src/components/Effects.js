import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import {injectIntl} from 'react-intl'
import EffectTable from './EffectTable'
import OnlyTitle from './shared/OnlyTitle'

const panelHeader = (title) => (
  <OnlyTitle title={title} />
)

class Effects extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
        <div className="container-fluid">
          <Panel header={panelHeader(formatMessage({id: 'effects'}))}>
            <EffectTable limit={50} usePaging showAccount />
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Effects)
