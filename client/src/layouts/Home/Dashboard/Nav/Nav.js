import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog, faDoorOpen} from '@fortawesome/free-solid-svg-icons'
import styles from './nav.module.css'

class Nav extends React.Component {

  constructor() {
    super();
    this.state = {
      menuVisible: false
    }
  };

  toggleMenuState = () => {
    if(this.state.menuVisible) {
      this.setState({
        menuVisible: false
      });
    } else {
      this.setState({
        menuVisible: true
      });
    }
  };

  render() {
    return (
      <div className={styles.nav}>
        <button onClick={(e) => this.toggleMenuState()}>
          <img src="/headshots/headshot-1.png" alt=" ">
          </img>
        </button>
        <br/>
        <nav className={styles.menu} style={!this.state.menuVisible ? {display:'none'} : {display:'block'}}>
          <div className={styles.menuItem}>
            <Link to="/account">
              <FontAwesomeIcon icon={faUser} size="lg" />
              Account
            </Link>
          </div>

          <div className={styles.menuItem}>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} size="lg" />
              Settings
            </Link>
          </div>

          <div className={styles.menuItem}>
            <Link to="/logout">
              <FontAwesomeIcon icon={faDoorOpen} size="lg" />
              Log Out
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav
