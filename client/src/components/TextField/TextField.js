import React, { Component } from 'react'
import './TextField.css'

class TextField extends Component {

  state = {
    focused: false
  }

  render() {
    let {id, type, value, label, onChange, style, labelStyle, inputStyle, fullWidth} = this.props
    return (
      <div
        className={`text-field ${fullWidth ? 'full' : ''}`}
        onFocus={()=>this.setState({focused: true})}
        onBlur={()=>this.setState({focused: false})}
        style={{...style}}
      >
        <label
          htmlFor={`input-${id}`}
          className={`${this.state.focused ? "up" : ""} ${value ? "full" : ""}`}
          style={{...labelStyle}}
        >
          {label}
        </label>
        <input
          type={type}
          id={`input-${id}`}
          value={value}
          style={{inputStyle}}
          onChange={onChange}
        />
        <div className="text-field-highlight">
          <hr className="unselected"></hr>
          <hr className={`selected ${this.state.focused ? "show" : ""}`}></hr>
        </div>
      </div>
    )
  }

}

export default TextField
