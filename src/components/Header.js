import React, { Component } from 'react'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import  { connect } from 'react-redux'
import { logout } from '../actions/login'

const logoutStyle = {
    float:'right'
}

class Header extends Component {

    state = {
        toLogin: false
    }

    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
        this.setState(() => ({
            toLogin: true
        }))
    }

    render(){
        const { user } = this.props;
        const { toLogin } = this.state;

        if(toLogin === true) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <nav className="nav">
                <ul>
                    <li><NavLink to="/home" activeClassName='active'>Home</NavLink></li>
                    <li><NavLink to="/add" activeClassName='active'>New Poll</NavLink></li>
                    <li><NavLink to="/leaderboard" activeClassName='active'>LeaderBoard</NavLink></li>
                    <li><NavLink to="#" className="header-menu" onClick={ this.logout } >Logout</NavLink></li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users}){
    return {
        user: users[authedUser]
    }
}

export default withRouter(connect(mapStateToProps)(Header));