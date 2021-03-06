import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Table from 'react-bootstrap/lib/Table'
import {injectIntl, FormattedMessage} from 'react-intl'
import has from 'lodash/has'

import AccountLink from './shared/AccountLink'
import ClipboardCopy from './shared/ClipboardCopy'
import Logo from './shared/Logo'
import NewWindowIcon from './shared/NewWindowIcon'
import StellarTomlBadge from './shared/StellarTomlBadge'

import {assetKeyToIssuer} from '../lib/utils'

import directory from '../data/directory'
const {anchors} = directory

class Anchor extends React.Component {
  render() {
    const {formatMessage} = this.props.intl

    const id = this.props.match.params.id
    const anchor = anchors[id]
    const domain = id
    const name = has(anchor, 'displayName') ? anchor.displayName : anchor.name

    if (!anchor || anchor == null) return null

    return (
        <div className="container-fluid">
          <Panel
            header={
              <h5>
                { formatMessage({id: 'anchor'}) }<span className="text-muted mx-5 word-break">{name}</span>
              </h5>
            }
          >
            <Table className="table-striped table-hover">
              <tbody>
                <tr>
                  <td width="100">
                    <a href={anchor.website} target="_blank">
                      <Logo name={domain} src={anchor.logo} width={70} />
                    </a>
                  </td>
                  <td>
                      {has(anchor, 'displayName')
                        ? anchor.displayName
                        : anchor.name}
                    <p>
                      <a href={anchor.website} target="_blank">
                        {anchor.website} {' '}
                        <NewWindowIcon />
                      </a>
                    </p>
                    <StellarTomlBadge domain={domain} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Panel>

          <h5>
            <FormattedMessage id="assets" />
          </h5>
          <Table className="table-striped table-hover">
            <thead>
              <tr>
                <th width="100">
                  <FormattedMessage id="code" />
                </th>
                <th>
                  <FormattedMessage id="issuer" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(anchor.assets)
                .sort()
                .map(code => {
                  const issuer = assetKeyToIssuer(anchor.assets[code])
                  return (
                    <tr key={code}>
                      <td>{code}</td>
                      <td className="word-break">
                        <AccountLink account={issuer} hideKnown /> {' '}
                        <ClipboardCopy text={issuer} />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
    )
  }
}

export default injectIntl(Anchor)
