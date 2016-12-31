/** Created by ge on 12/31/16. */
import React, {Component, PropTypes} from 'react'
import {PDF_VIEWER} from '../configs'

const propTypes = {
  ratio: PropTypes.number,
  file: PropTypes.string.isRequired
}

const defaultProps = {
  ratio: 56.25
}

class PdfViewer extends Component {
  shouldComponentUpdate(newProps) {
    return this.props.file != newProps.file
  }

  render() {
    const {ratio, file} = this.props

    return (
      <div className="pdf-viewer" style={{paddingBottom: `${ratio}%`}} content="Loading">
        <iframe src={`${PDF_VIEWER}?file=${file}`}/>
      </div>
    )
  }
}

PdfViewer.propTypes = propTypes
PdfViewer.defaultProps = defaultProps

export default PdfViewer
