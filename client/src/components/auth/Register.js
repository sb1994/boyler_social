import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerAuth } from '../../actions/userAuthActions'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    let { email, password, name } = this.state

    const registerData = {
      password,
      email,
      name,
    }
    // console.log(registerData);
    this.props.registerAuth(registerData)
    // this.props.history.push('/login')
  }
  render() {
    let { error } = this.props
    console.log(error)

    return (
      <div className='container'>
        <form>
          <div className='form-group'>
            <label htmlFor='emailInput'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              placeholder='Enter email'
              onChange={this.handleInputChange}
              name='email'
              value={this.state.email}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
              onChange={this.handleInputChange}
              name='password'
              value={this.state.password}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='nameInput'>Name</label>
            <input
              type='text'
              className='form-control'
              id='nameInput'
              placeholder='Name'
              onChange={this.handleInputChange}
              name='name'
              value={this.state.name}
            />
          </div>
          <button className='btn btn-primary' onClick={this.handleSubmit}>
            Register
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  }
}

export default connect(mapStateToProps, { registerAuth })(Register)
