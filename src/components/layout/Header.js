import React from 'react'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import NavItem from 'react-bootstrap/lib/NavItem'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {FormattedMessage, injectIntl} from 'react-intl'

// import LanguageSelector from './LanguageSelector'
import NetworkSelector from './NetworkSelector'

class Header extends React.Component {
  render() {
    const {formatMessage} = this.props.intl
    return (
      <Navbar fluid fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="150" height="30" viewBox="0 0 170 34">
                <path fill="#0059B3" d="m 30.516,15.48 -6,6 a 8.413,8.413 0 0 1 -13.3,-1.7 l 3.208,-3.21 c 0.088,0.782 2.841,5.235 7.091,1.9 l 6,-6 a 4.2426407,4.2426407 0 1 0 -6,-6 L 19.377,8.63 A 8.014,8.014 0 0 0 13.845,8.165 l 4.677,-4.679 a 8.4828069,8.4828069 0 1 1 11.993,12 z" />
                <path fill="#39BAC6" d="m 3.484,18.521 6,-6 a 8.413,8.413 0 0 1 13.3,1.7 l -3.208,3.21 c -0.088,-0.782 -2.841,-5.235 -7.091,-1.9 l -6,6 a 4.2426407,4.2426407 0 0 0 6,6 l 2.144,-2.145 a 8.014,8.014 0 0 0 5.534,0.462 l -4.68,4.682 a 8.4831603,8.4831603 0 1 1 -11.994,-12 z" />
                <path fill="currentColor" d="m 45.672,25.3 a 3.532,3.532 0 0 1 -1.284,0.648 5.783,5.783 0 0 1 -1.6,0.216 4.529,4.529 0 0 1 -3.264,-1.1 4.249,4.249 0 0 1 -1.148,-3.216 V 15.68 h -2.112 v -2.4 h 2.112 v -2.928 h 3 v 2.928 h 3.432 v 2.4 h -3.432 v 6.1 a 2.028,2.028 0 0 0 0.456,1.42 1.711,1.711 0 0 0 1.32,0.492 2.636,2.636 0 0 0 1.68,-0.528 z m 7.8,0.864 a 7.271,7.271 0 0 1 -3.5,-0.84 6.125,6.125 0 0 1 -2.436,-2.34 6.608,6.608 0 0 1 -0.876,-3.4 6.544,6.544 0 0 1 0.876,-3.384 6.15,6.15 0 0 1 2.436,-2.328 7.271,7.271 0 0 1 3.5,-0.84 7.322,7.322 0 0 1 3.528,0.848 6.15,6.15 0 0 1 2.436,2.328 6.544,6.544 0 0 1 0.876,3.384 6.608,6.608 0 0 1 -0.876,3.4 6.125,6.125 0 0 1 -2.436,2.336 7.322,7.322 0 0 1 -3.528,0.84 z m 0,-2.568 a 3.665,3.665 0 0 0 2.736,-1.1 3.975,3.975 0 0 0 1.08,-2.9 3.975,3.975 0 0 0 -1.08,-2.9 3.665,3.665 0 0 0 -2.736,-1.1 3.626,3.626 0 0 0 -2.724,1.1 4,4 0 0 0 -1.068,2.9 4,4 0 0 0 1.068,2.9 3.626,3.626 0 0 0 2.724,1.104 z M 68.424,20.5 66.192,22.616 V 26 h -3 V 8.192 h 3 v 10.752 l 6.216,-5.76 h 3.6 L 70.656,18.56 76.512,26 h -3.648 z m 21.552,-0.84 q 0,0.312 -0.048,0.888 H 79.872 a 3.486,3.486 0 0 0 1.38,2.252 4.523,4.523 0 0 0 2.772,0.828 4.671,4.671 0 0 0 3.476,-1.396 l 1.612,1.848 a 5.418,5.418 0 0 1 -2.184,1.56 7.955,7.955 0 0 1 -2.976,0.528 7.92,7.92 0 0 1 -3.72,-0.84 6.05,6.05 0 0 1 -2.484,-2.34 6.608,6.608 0 0 1 -0.876,-3.4 6.706,6.706 0 0 1 0.852,-3.372 6.044,6.044 0 0 1 2.364,-2.34 6.9,6.9 0 0 1 3.408,-0.84 6.724,6.724 0 0 1 3.348,0.828 5.864,5.864 0 0 1 2.3,2.328 7.059,7.059 0 0 1 0.832,3.472 z M 83.5,15.44 a 3.619,3.619 0 0 0 -2.436,0.852 3.584,3.584 0 0 0 -1.216,2.268 H 87.12 A 3.537,3.537 0 0 0 85.944,16.3 3.576,3.576 0 0 0 83.5,15.44 Z m 16.632,-2.4 a 5.355,5.355 0 0 1 3.888,1.416 5.585,5.585 0 0 1 1.464,4.2 V 26 h -3 v -6.96 a 3.6,3.6 0 0 0 -0.792,-2.532 2.928,2.928 0 0 0 -2.256,-0.852 3.463,3.463 0 0 0 -2.616,1 3.97,3.97 0 0 0 -0.96,2.868 V 26 h -3 V 13.184 h 2.856 v 1.656 a 4.69,4.69 0 0 1 1.868,-1.34 6.737,6.737 0 0 1 2.544,-0.46 z M 121.06,13.184 115.56,26 h -3.1 l -5.5,-12.816 h 3.12 l 3.984,9.5 4.1,-9.5 z m 6.36,-0.144 a 6.249,6.249 0 0 1 4.328,1.36 5.242,5.242 0 0 1 1.5,4.092 V 26 h -2.832 v -1.56 a 3.49,3.49 0 0 1 -1.572,1.284 6.145,6.145 0 0 1 -2.46,0.444 6.027,6.027 0 0 1 -2.52,-0.492 3.894,3.894 0 0 1 -1.664,-1.368 3.472,3.472 0 0 1 -0.588,-1.98 3.394,3.394 0 0 1 1.284,-2.772 6.377,6.377 0 0 1 4.044,-1.044 h 3.312 V 18.32 a 2.627,2.627 0 0 0 -0.8,-2.064 3.478,3.478 0 0 0 -2.388,-0.72 6.893,6.893 0 0 0 -2.124,0.336 5.218,5.218 0 0 0 -1.764,0.936 L 122,14.624 a 7.282,7.282 0 0 1 2.424,-1.176 10.785,10.785 0 0 1 2.992,-0.408 z m -0.412,10.944 a 3.874,3.874 0 0 0 2,-0.516 2.808,2.808 0 0 0 1.236,-1.476 V 20.5 h -3.1 q -2.592,0 -2.592,1.7 a 1.53,1.53 0 0 0 0.648,1.3 2.971,2.971 0 0 0 1.808,0.484 z m 22.488,-10.8 V 26 h -2.856 v -1.632 a 4.774,4.774 0 0 1 -1.8,1.332 5.791,5.791 0 0 1 -2.328,0.468 5.571,5.571 0 0 1 -4.044,-1.428 5.634,5.634 0 0 1 -1.476,-4.24 v -7.32 h 3 v 6.92 a 3.713,3.713 0 0 0 0.78,2.58 2.858,2.858 0 0 0 2.22,0.852 3.362,3.362 0 0 0 2.556,-1 4,4 0 0 0 0.948,-2.868 v -6.48 z m 3.936,-4.992 h 3 V 26 h -3 z M 168.7,25.3 a 3.532,3.532 0 0 1 -1.284,0.648 5.783,5.783 0 0 1 -1.6,0.216 4.529,4.529 0 0 1 -3.264,-1.1 4.249,4.249 0 0 1 -1.152,-3.216 V 15.68 h -2.112 v -2.4 h 2.112 v -2.928 h 3 v 2.928 h 3.432 v 2.4 H 164.4 v 6.1 a 2.028,2.028 0 0 0 0.456,1.428 1.711,1.711 0 0 0 1.32,0.492 2.636,2.636 0 0 0 1.68,-0.528 z" />
              </svg>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {/*
          <Navbar.Form pullRight>
            <LanguageSelector
              language={this.props.language}
              switcher={this.props.languageSwitcher}
            />
          </Navbar.Form>
          <Navbar.Form pullRight>
            <NetworkSelector
              networkAddress={this.props.networkAddress}
              networkType={this.props.networkType}
              switchNetworkType={this.props.switchNetworkType}
              setNetworkAddress={this.props.setNetworkAddress}
            />
          </Navbar.Form>
          */}
          <Nav>
            <LinkContainer to="/operations">
              <NavItem>
                <FormattedMessage id="operations" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/txs">
              <NavItem>
                <FormattedMessage id="transactions" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/ledgers">
              <NavItem>
                <FormattedMessage id="ledgers" />
              </NavItem>
            </LinkContainer>

            <li className="divider-vertical" />

            <LinkContainer to="/assets">
              <MenuItem>
                <FormattedMessage id="assets" />
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="/anchors">
              <MenuItem>
                <FormattedMessage id="anchors" />
              </MenuItem>
            </LinkContainer>
            <LinkContainer to="/exchanges">
              <MenuItem>
                <FormattedMessage id="exchanges" />
              </MenuItem>
            </LinkContainer>

            <li className="divider-vertical" />

            <NavDropdown
              eventKey={3}
              title={formatMessage({id: 'more'})}
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/effects">
                <MenuItem>
                  <FormattedMessage id="effects" />
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/payments">
                <MenuItem>
                  <FormattedMessage id="payments" />
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/trades">
                <MenuItem>
                  <FormattedMessage id="trades" />
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/pools">
                <MenuItem>
                  <FormattedMessage id="inflation.pools" />
                </MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default injectIntl(Header)
