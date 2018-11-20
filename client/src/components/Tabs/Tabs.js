import React, { Component } from 'react'
import './Tabs.css'

class Tabs extends Component {
  state = {
    index: 0
  }

  render() {
    let {children} = this.props
    let chosen = children[this.state.index]

    let highlightWidth = 100/children.length
    let highlightLeft = highlightWidth*this.state.index

    return (
      <div className="tabs-container">
        <div className="tabs-header">
          <div className="tabs-button-container">
            {children.map((child, i) => (
              <button key={i} onClick={()=>this.setState({index: i})}>
                {child.props.label}
              </button>
            ))}
          </div>
          <div className="tab-highlight" style={{width:`${highlightWidth}%`, left:`${highlightLeft}%`}}></div>
        </div>
        <div className="tabs-content">
          {chosen}
        </div>
      </div>
    )
  }

}

export default Tabs
