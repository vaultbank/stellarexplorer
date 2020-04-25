import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import {FormattedMessage} from 'react-intl'

const knownErrors = ['network']

class Error extends React.Component {
  render() {
    const id = this.props.match.params.id
    return (
      <Grid fluid>
        <Panel>
          <h3 className="m-5 text-center text-muted word-break">
            {id && knownErrors.indexOf(id) !== -1 ? (
              <FormattedMessage id={`error.${id}`} />
            ) : (
              <FormattedMessage id="error.unknown" />
            )}
          </h3>
        </Panel>
      </Grid>
    )
  }
}

export default Error
