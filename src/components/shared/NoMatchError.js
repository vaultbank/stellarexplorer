import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import {FormattedMessage} from 'react-intl'

class NoMatchError extends React.Component {
  render() {
    const id = this.props.match.params.id
    return (
      <Grid fluid>
        <Panel>
          <h3 className="m-5 text-center text-muted">
            {id ? (
              <FormattedMessage id="error.cant.find" values={{searchStr: id}} />
            ) : (
              <FormattedMessage
                id="error.nothing.found"
                values={{path: this.props.location.pathname}}
              />
            )}
          </h3>
        </Panel>
      </Grid>
    )
  }
}

export default NoMatchError
