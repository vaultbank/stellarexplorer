import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage, injectIntl} from 'react-intl'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import AccountLink from './shared/AccountLink'
import ClipboardCopy from './shared/ClipboardCopy'
import Logo from './shared/Logo'
import NewWindowIcon from './shared/NewWindowIcon'
import StellarTomlBadge from './shared/StellarTomlBadge'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'

import {assetKeyToIssuer} from '../lib/utils'

import directory from '../data/directory'
const {anchors} = directory

const METADATA_PATH =
  'https://raw.githubusercontent.com/irisli/stellarterm/master/directory/directory.json'

const tradeURL = (assetCode, issuerDomain) =>
  `https://stellarterm.com/#exchange/XLM-native/${assetCode}-${issuerDomain}`

// render list of asset codes, each code on a new line
const AssetCodeColumn = ({assets}) => (
  <td title="Asset">{Object.keys(assets).map(code => <p key={code}>{code}</p>)}</td>
)

const IssuerColumn = ({assets}) => (
  <td title="Issuer">
    {Object.keys(assets).map(code => {
      const issuer = assetKeyToIssuer(assets[code])
      return (
        <p key={code}>
          <AccountLink account={issuer} hideKnown /> {' '}
          <ClipboardCopy text={issuer} />
        </p>
      )
    })}
  </td>
)

const TradeColumn = ({assets, domain}) => (
  <td title="StellarTerm">
    {Object.keys(assets).map(code => (
      <p key={code}>
        <a href={tradeURL(code, domain)} target="_blank">
          Trade
        </a>
      </p>
    ))}
  </td>
)

const Anchor = ({assets, domain, displayName, logo, website}) => {
  return (
    <tr>
      <td className="ignore-responsive left">
        <Link to={`/anchor/${domain}`}>
          <Logo name={domain} src={logo} width={70} />
        </Link>
      </td>
      <td title="" className="anchorLinkCol">
        <Link to={`/anchor/${domain}`}>{displayName}</Link>
        <p>
          <a href={website} target="_blank">
            {website} {' '}
            <NewWindowIcon />
          </a>
        </p>
        <p>
          <StellarTomlBadge domain={domain} />
        </p>
      </td>
      <AssetCodeColumn assets={assets} />
      <IssuerColumn assets={assets} />
      <TradeColumn assets={assets} domain={domain} />
    </tr>
  )
}

Anchor.propTypes = {
  assets: PropTypes.object.isRequired,
  domain: PropTypes.string.isRequired,
  logo: PropTypes.string,
  website: PropTypes.string.isRequired,
}

class Anchors extends React.Component {
  render() {
    if (!anchors) return null
    const {formatMessage} = this.props.intl
    const header = titleWithJSONButton(
      formatMessage({id: 'anchors'}),
      METADATA_PATH
    )
    return (
        <div className="container-fluid">
          <Panel header={header}>
          <Table className="table-striped table-hover tbl-responsive">
              <colgroup>
                <col width="100" />
              </colgroup>
              <thead>
                <tr>
                  <th />
                  <th />
                  <th>
                    <FormattedMessage id="asset" />
                  </th>
                  <th>
                    <FormattedMessage id="issuer" />
                  </th>
                  <th>StellarTerm</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(anchors).map(domain => {
                  const anchor = anchors[domain]
                  return (
                    <Anchor
                      key={domain}
                      assets={anchor.assets}
                      domain={domain}
                      displayName={anchor.displayName}
                      logo={anchor.logo}
                      website={anchor.website}
                    />
                  )
                })}
              </tbody>
            </Table>
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Anchors)
