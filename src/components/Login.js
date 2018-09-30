import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/login'


class Login extends Component {

    state = {
        user: '',
        isAuthenticated: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.user !== ''){
            this.props.dispatch(setAuthedUser(this.state.user))
            this.props.history.push('/home')
        }
    }

    handleOnChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({
            user: value
        }))
    }

    render(){
        const { users } = this.props;
        return (
            <div className="login-page">
                <div className="login-box">
                <h3 className="sign-in-title">Sign In</h3>
                    <div className="login-form ">
                        <form onSubmit={this.handleSubmit}>
                            <select id="users" className="dropdown-list" value={this.state.user} onChange={this.handleOnChange}>
                                <option value="">--select--</option>
                               {
                                   users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                   ))
                                }
                            </select>
                            <button type="submit" className="btn">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users: Object.values(users).map((user) => {
            return ({
                id: user.id,
                name: user.name
            })
        }),
    }
}

export default withRouter(connect(mapStateToProps)(Login));