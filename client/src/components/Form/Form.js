import React from 'react'
import './Form.css'

const Form = ({title, children}) => (
  <div className="form">
    <h1 className="title">{title}</h1>
    <div className="form-content">
      {children}
    </div>
  </div>
)

export default Form
