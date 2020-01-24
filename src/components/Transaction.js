import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
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
                {formatMessage({id: 'transaction'})}
                <span className="text-muted mx-5">
                  ({id})
                </span>
                <ClipboardCopy text={id} />
              </span>,
              urlFn(id)
            )}
          >
            <Table className="table-striped table-hover">
              <colgroup>
                <col width="150" />
                <col width="20" />
              </colgroup>
              <tbody>
                <tr>
                  <th>
                    <FormattedMessage id="time" />
                  </th>
                  <td>:</td>
                  <td>
                    <FormattedDate value={time} />&nbsp;
                    <FormattedTime value={time} />
                  </td>
                </tr>
                <tr>
                  <th>
                    <FormattedMessage id="fee" />
                  </th>
                  <td>:</td>
                  <td>{fee} stroops</td>
                </tr>
                <tr>
                  <th>
                    <FormattedMessage id="ledger" />
                  </th>
                  <td>:</td>
                  <td>
                    <Link to={`/ledger/${ledger}`}>{ledger}</Link>
                  </td>
                </tr>
                <tr>
                  <th>
                    <FormattedMessage id="memo" />{' '}
                    <span className="text-muted">
                      ({memoTypeToLabel[memoType]})
                    </span>
                  </th>
                  <td>:</td>
                  <td>
                    {memoType === MemoHash || memoType === MemoReturn
                      ? base64DecodeToHex(memo)
                      : memo
                    }
                  </td>
                </tr>
              </tbody>
            </Table>
          </Panel>
          <Panel
            header={
              <h5 id="operations-table">
                <FormattedMessage id="operations" />
                <span className="text-muted">
                  {` (${opCount})`}
                </span>
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
