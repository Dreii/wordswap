import React, { Component } from 'react'
import './UserDropdown.css'
import Link from '../../Link/Link'
import Image from '../../Image/Image'
import DropdownPaper from '../../Form/DropdownPaper/DropdownPaper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class UserDropdown extends Component {

  state = {
    open: false
  }

  render() {
    let image = "", name = "", displayName="", loading = false
    if(this.props.user){
      image = this.props.user.image
      name = this.props.user.name
      displayName = name.split(" ")[0]
    }else loading = true

    return (
      <div className={`dropdown-container ${loading ? "loading" : ""}`}>
        <div
          className="dropdown"
          onClick={()=>this.setState({open: !this.state.open})}
        >
          <p className="name">{displayName}</p>
          <Image src={image} alt="User Profile" title={name} size={32} />
        </div>

        <DropdownPaper open={this.state.open} origin={"top right"} containerStyle={{right:0, top: 38}}>
          <div
            className="menu"
            onClick={(e)=>{
              e.stopPropagation();
            }}
          >
            <ul>
              <li>
                <Link to='/settings' onClick={()=>this.setState({open: false})}>
                  <span><FontAwesomeIcon icon="cog"/></span><span>Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={()=>{
                    this.setState({open: false})
                    this.props.deauthenticate()
                  }}
                  to="/login"
                >
                  <span><FontAwesomeIcon icon="sign-out-alt"/></span><span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </DropdownPaper>
      </div>
    )
  }

}

export default UserDropdown
