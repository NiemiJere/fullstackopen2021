import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Please log in to the application</h2>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          name="Password"
          id='password'
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

export default LoginForm

