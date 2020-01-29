import PropTypes from 'prop-types'
import React from 'react'
import JSONButton from './JSONButton'

const TitleWithJSONButton = ({title, url}) => (
  <div>
    <span className="pull-right">
      <JSONButton url={url} />
    </span>
    <h5 className="m-0">
      {title}
    </h5>
  </div>
)

TitleWithJSONButton.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  url: PropTypes.string.isRequired,
}

const titleWithJSONButton = (title, url) => {
  return <TitleWithJSONButton title={title} url={url} />
}

export {titleWithJSONButton, TitleWithJSONButton}
