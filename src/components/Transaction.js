import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
  injectIntl,
} from 'react-intl'
import PropTypes from 'prop-types'
import {MemoHash, MemoReturn} from 'stellar-sdk'

import {base64DecodeToHex, handleFetchDataFailure} from '../lib/utils'
import ClipboardCopy from './shared/ClipboardCopy'
import {withServer} from './shared/HOCs'
import OperationTable from './OperationTable'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'

const memoTypeToLabel = {
  id: 'ID',
  hash: 'Hash',
  none: 'None',
  return: 'Return',
  text: 'Text',
}

class Transaction extends React.Component {
  static defaultProps = {
    operations: [],
  }

  render() {
    const {id, urlFn, fee, ledger, memoType, memo, opCount, time} = this.props
    const {formatMessage} = this.props.intl

    if (!id) return null
    return (
        <Grid fluid>
          <Panel
            header={titleWithJSONButton(
              <span>
                {formatMessage({id: 'transaction'})}{' '}
                <span className="secondary-heading">{id}</span>
                <ClipboardCopy text={id} />
              </span>,
              urlFn(id)
            )}
          >
            <Table className="table-striped table-hover">
              <tbody>
                <tr>
                  <td>
                    <FormattedMessage id="time" />
                  </td>
                  <td>
                    <FormattedDate value={time} />&nbsp;
                    <FormattedTime value={time} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormattedMessage id="fee" />
                  </td>
                  <td>{fee} stroops</td>
                </tr>
                <tr>
                  <td>
                    <FormattedMessage id="ledger" />
                  </td>
                  <td>
                    <Link to={`/ledger/${ledger}`}>{ledger}</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormattedMessage id="memo" />{' '}
                    <span className="secondary-heading">
                      ({memoTypeToLabel[memoType]})
                    </span>
                  </td>
                  <td>
                    {memoType === MemoHash || memoType === MemoReturn
                      ? base64DecodeToHex(memo)
                      : memo}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Panel>
          <Panel
            header={
              <h5 id="operations-table">
                <FormattedMessage id="operations" />
                <small>
                  {` (${opCount})`}
                </small>
              </h5>
            }
          >
            <OperationTable limit={opCount} tx={id} />
          </Panel>
        </Grid>
    )
  }
}

Transaction.propTypes = {
  fee: PropTypes.number,
  id: PropTypes.string,
  ledger: PropTypes.number,
  memo: PropTypes.string,
  memoType: PropTypes.string,
  operations: PropTypes.array,
  time: PropTypes.string,
  urlFn: PropTypes.func,
}

const TransactionIntl = injectIntl(Transaction)

class TransactionContainer extends React.Component {
  state = {
    operations: [],
  }

  componentDidMount() {
    const id = this.props.match.params.id
    const server = this.props.server
    server
      .transactions()
      .transaction(id)
      .call()
      .then(res => {
        this.setState({tx: res})
        return null
      })
      .catch(handleFetchDataFailure(id))
  }

  render() {
    if (!this.state.tx) return null
    const tx = this.state.tx
    return (
      <TransactionIntl
        id={tx.id}
        fee={tx.fee_paid}
        ledger={tx.ledger_attr}
        memoType={tx.memo_type}
        memo={tx.memo}
        opCount={tx.operation_count}
        time={tx.created_at}
        urlFn={this.props.server.txURL}
      />
    )
  }
}

export default withServer(TransactionContainer)
