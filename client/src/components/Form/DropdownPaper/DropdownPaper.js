import React from 'react'

import './DropdownPaper.css'

const DropdownPaper = ({open, children, origin, style, containerStyle}) => (
  <div className={`drop-down-paper ${open ? "open" : ""}`} style={{transformOrigin: origin, ...containerStyle}}>
    <div className="drop-down-paper-content" style={{...style}}>
      {children}
    </div>
  </div>
)

export default DropdownPaper
