import React from 'react'
import PropTypes from 'prop-types'

const Logo = ({name, src, height, width}) => {
  const imgSrc = src
    ? src
    : `${process.env.PUBLIC_URL}/img/${name.toLowerCase()}.png`
  return (
      <img
        src={imgSrc}
        alt={name}
        title={name}
        style={{maxHeight: height, maxWidth: width}}
      />
  )
}

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
}

Logo.defaultProps = {
  width: 24,
  height: 150,
}

export default Logo
