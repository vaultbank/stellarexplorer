import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {
  injectIntl,
  FormattedDate,
  FormattedNumber,
  FormattedMessage,
  FormattedTime,
} from 'react-intl'
import has from 'lodash/has'

import {handleFetchDataFailure, shortHash, stroopsToLumens} from '../lib/utils'
import ClipboardCopy from './shared/ClipboardCopy'
import {withServer} from './shared/HOCs'
import TransactionTable from './TransactionTableContainer'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'
import OnlyTitle from './shared/OnlyTitle'

const panelHeader = (title) => (
  <OnlyTitle title={title} />
)

const ledgerHash = hash => shortHash(hash, 20)

const responseToState = rsp => {
  // NOTE: as at 11 March 2018 testnet horizon returns base values in stroops
  //        but mainnet returns in lumens. so handling both until all are moved
  //        to stroops.
  const baseInStroops = has(rsp, 'base_fee_in_stroops')
  return {
    seq: rsp.sequence,
    time: rsp.closed_at,
    txCount: rsp.transaction_count,
    opCount: rsp.operation_count,
    hash: rsp.hash,
    prevHash: rsp.prev_hash,
    prevSeq: Number(rsp.sequence) - 1, // horizon doesn't support ledger lookup by hash - so derive seq - does this break?
    protocol: rsp.protocol_version,
    totalCoins: rsp.total_coins, // maybe display these on the front page ...?
    feePool: rsp.fee_pool,
    maxTxSetSize: rsp.max_tx_set_size,

    baseInStroops,
    baseFee: baseInStroops ? rsp.base_fee_in_stroops : rsp.base_fee,
    baseReserve: baseInStroops ? rsp.base_reserve_in_stroops : rsp.base_reserve,
  }
}

const DetailRow = ({label, children}) => (
  <tr>
    <th width="125">
      <FormattedMessage id={label} />
    </th>
    <td className="px-0" width="2">:</td>
    <td className="pl-5px word-break">{children}</td>
  </tr>
)

class Ledger extends React.Component {
  render() {
    const {
      baseInStroops,
      baseFee,
      baseReserve,
      feePool,
      hash,
      maxTxSetSize,
      opCount,
      prevHash,
      prevSeq,
      protocol,
      seq,
      time,
      totalCoins,
      txCount,
      urlFn,
    } = this.props

    const {formatMessage} = this.props.intl

    return (
        <Grid fluid>
          <Panel
            header={titleWithJSONButton(
              <div className="panel-title">
                {formatMessage({id: 'ledger'})}
                <span className="text-muted mx-5">
                  ({seq})
                </span>
                <ClipboardCopy text={String(seq)} />
              </div>,
              urlFn(seq)
            )}
          >
          <Row className="m-0">
            <Col className="p-0" md={6}>
              <Table className="table-striped table-hover">
                <colgroup>
                  <col width="150"/>
                  <col width="10"/>
                </colgroup>
                <tbody>
                  <DetailRow label="time">
                    <FormattedDate value={time} />{' '}
                    <FormattedTime value={time} />
                  </DetailRow>
                  <DetailRow label="hash">
                    <span title={hash}>{ledgerHash(hash)}</span>
                  </DetailRow>
                  <DetailRow label="prevHash">
                    <span title={prevHash}>
                      <Link to={`/ledger/${prevSeq}`}>
                        {ledgerHash(prevHash)}
                      </Link>
                    </span>
                  </DetailRow>
                  <DetailRow label="transactions">{txCount}</DetailRow>
                  <DetailRow label="operations">{opCount}</DetailRow>
                </tbody>
              </Table>
            </Col>
            <Col className="p-0 border-left" md={6}>
              <Table className="table-striped table-hover">
                <colgroup>
                  <col width="150" />
                  <col width="10"/>
                </colgroup>
                <tbody>
                  <DetailRow label="base.fee">
                    <FormattedNumber value={baseFee} /> stroops
                  </DetailRow>
                  <DetailRow label="base.reserve">
                    {baseInStroops
                      ? stroopsToLumens(baseReserve)
                      : Number(baseReserve)}{' '}
                    XLM
                  </DetailRow>
                  <DetailRow label="max.transactions">
                    {maxTxSetSize} per ledger
                  </DetailRow>
                  <DetailRow label="fee.pool">
                    <FormattedNumber value={feePool} /> XLM
                  </DetailRow>
                  <DetailRow label="total.coins">
                    <FormattedNumber value={totalCoins} /> XLM
                  </DetailRow>
                  <DetailRow label="protocolVersion">{protocol}</DetailRow>
                </tbody>
              </Table>
            </Col>
            </Row>
          </Panel>
        {opCount > 0 && (
          <Panel header={panelHeader(formatMessage({id:'transactions'}))}>
            <TransactionTable
              compact={false}
              ledger={seq}
              limit={maxTxSetSize}
              refresh={false}
              showLedger={false}
            />
          </Panel>
        )}
        </Grid>
    )
  }
}

class LedgerContainer extends React.Component {
  state = {
    seq: 0,
  }

  componentDidMount() {
    this.loadLedger(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    this.loadLedger(nextProps.match.params.id)
  }

  loadLedger(ledgerId) {
    this.props.server
      .ledgers()
      .ledger(ledgerId)
      .call()
      .then(res => {
        this.setState(responseToState(res))
        return null
      })
      .catch(handleFetchDataFailure(ledgerId))
  }

  render() {
    return this.state.seq === 0 ? null : (
      <Ledger
        urlFn={this.props.server.ledgerURL}
        {...this.state}
        {...this.props}
      />
    )
  }
}

export default injectIntl(withServer(LedgerContainer))
