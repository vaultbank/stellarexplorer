import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class TitleWithLink extends React.Component {
  render() {
    const {title, rightLinkLabel, rightLinkAddr} = this.props
    return (
      <div>
        <Link to={rightLinkAddr} className="pull-right">
          {rightLinkLabel}
        </Link>
        <h5 className="m-0">
          {title}
        </h5>
      </div>
    )
  }
}

TitleWithLink.propTypes = {
  title: PropTypes.string.isRequired,
  rightLinkLabel: PropTypes.string.isRequired,
  rightLinkAddr: PropTypes.string.isRequired,
}

export default TitleWithLink
