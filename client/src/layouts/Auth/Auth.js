import React from 'react'

import './Auth.css'

const Auth = ({authenticate}) => (
  <div className="auth">
    <button onClick={authenticate}>Login</button>
  </div>
)

export default Auth
