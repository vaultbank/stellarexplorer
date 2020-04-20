import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import Table from 'react-bootstrap/lib/Table'
import {FormattedMessage, injectIntl} from 'react-intl'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import has from 'lodash/has'

import AccountLink from './shared/AccountLink'
import BackendResourceBadgeButton from './shared/BackendResourceBadgeButton'
import ClipboardCopy from './shared/ClipboardCopy'
import Logo from './shared/Logo'
import NewWindowIcon from './shared/NewWindowIcon'
import {titleWithJSONButton} from './shared/TitleWithJSONButton'

import directory from '../data/directory'
const {anchors, assets} = directory

const METADATA_PATH =
  'https://raw.githubusercontent.com/irisli/stellarterm/master/directory/directory.json'

const Asset = ({code, domain, issuer}) => {
  const anchor = anchors[domain]
  return (
    <tr>
      <td className="ignore-responsive">
        <a href={anchor.website} target="_blank">
          <Logo name={domain} src={anchor.logo} width={70} />
        </a>
      </td>
      <td title="Code">{code}</td>
      <td title="Issuer">
        <AccountLink account={issuer} hideKnown /> {' '}
        <ClipboardCopy text={issuer} />
      </td>
      <td title="Anchor">
        <Link to={`/anchor/${domain}`}>{anchor.name}</Link>
        <p>
          <a href={anchor.website} target="_blank">
            {anchor.website} {' '}
            <NewWindowIcon />
          </a>
        </p>
        <BackendResourceBadgeButton
          label="server.toml"
          url={`https://${domain}/.well-known/stellar.toml`}
        />
      </td>
    </tr>
  )
}

Asset.propTypes = {
  code: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
}

class Assets extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    const header = titleWithJSONButton(
      formatMessage({id: 'assets'}),
      METADATA_PATH
    )

    // if we have a code from /asset/<code> then show only assets with code
    // starting with <code>; otherwise show all assets (/assets)
    const allAssetKeys = Object.keys(assets)
    const assetKeys = has(this.props, 'match.params.id')
      ? allAssetKeys.filter(k =>
        k.startsWith(this.props.match.params.id.toUpperCase())
      )
      : allAssetKeys

    return (
        <div className="container-fluid">
          <Panel header={header}>
            <Table className="table-striped table-hover tbl-responsive">
              <colgroup>
                <col width="60" />
              </colgroup>
              <thead>
                <tr>
                  <th />
                  <th>
                    <FormattedMessage id="code" />
                  </th>
                  <th>
                    <FormattedMessage id="issuer" />
                  </th>
                  <th>
                    <FormattedMessage id="anchor" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {assetKeys.sort().map(key => {
                  const asset = assets[key]
                  return <Asset key={key} {...asset} />
                })}
              </tbody>
            </Table>
          </Panel>
        </div>
    )
  }
}

export default injectIntl(Assets)
