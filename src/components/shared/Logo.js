import React from 'react'
import PropTypes from 'prop-types'

const Logo = ({name, src}) => {
  const imgSrc = src
    ? src
    : `${process.env.PUBLIC_URL}/img/${name.toLowerCase()}.png`
  return (
      <img
        src={imgSrc}
        alt={name}
        title={name}
        style={{maxHeight: 24, maxWidth: 150}}
      />
  )
}

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
}

export default Logo
