import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import {injectIntl} from 'react-intl'
import EffectTable from './EffectTable'

class Effects extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
      <div className="container-fluid">
        <Row>
          <Panel header={formatMessage({id: 'effects'})}>
            <EffectTable limit={50} usePaging showAccount />
          </Panel>
        </Row>
      </div>
    )
  }
}

export default injectIntl(Effects)
