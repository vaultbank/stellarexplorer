import React from 'react'
import PropTypes from 'prop-types'

class OnlyTitle extends React.Component {
  render() {
    const {title} = this.props
    return (
      <h5 className="m-0">
        {title}
      </h5>
    )
  }
}

OnlyTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default OnlyTitle
