import React, { Component } from 'react'
import { loginAuth, getCurrentUser } from '../../actions/userAuthActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }
  componentDidMount() {
    let { auth, history } = this.props
    // console.log(isAuthenticated)
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    let { email, password } = this.state
    if (email === '' || password === '') {
      alert('Both Inputs Are Required')
    } else {
      this.props.loginAuth(email, password)
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.isAuthenticated)
    if (nextProps.auth.isAuthenticated) {
      // this.props.getCurrentUser(this.props.auth.user.id)
      console.log(this.props.auth)

      // this.props.getCurrentUser(nextProps.auth.user._id)
      this.props.history.push(`/profile/${nextProps.auth.user._id}/posts`)
    }
  }

  render() {
    let { email, password } = this.state
    return (
      <div className='container'>
        <div className='col-12 col-md-8'>
          <h1 className='text-center'>Login</h1>
          <div className='form-group'>
            <label htmlFor='emailInput'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='emailInput'
              placeholder='Enter email'
              onChange={this.handleInputChange}
              name='email'
              autoFocus
              value={email}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordInput'>Password</label>
            <input
              type='text'
              className='form-control'
              id='passwordInput'
              placeholder='Password'
              onChange={this.handleInputChange}
              name='password'
              value={password}
            />
          </div>
          <button className='btn btn-primary' onClick={this.handleSubmit}>
            Login
          </button>
          <Link to='/register'>Register</Link>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    auth: state.auth,
  }
}
export default connect(mapStateToProps, { loginAuth, getCurrentUser })(Login)
