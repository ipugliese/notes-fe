import PropTypes from 'prop-types'

const LoginForm = ({ fields: { username, password } , handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      username
      <input
        type='text'
        value={username.value}
        name='Username'
        onChange={({ target }) => username.setValue(target.value)}
      />
    </div>
    <div>
      password
      <input
        type='password'
        value={password.value}
        name='Password'
        onChange={({ target }) => password.setValue(target.value)}
      />
    </div>
    <button type='submit'>login</button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
}

export default LoginForm