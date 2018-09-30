import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import  { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import '../App.css';
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Header from './Header'
import HomePage from './HomePage'
import Poll from './Poll'
import PollPage from './PollPage'
import NewPoll from './NewPoll'
import NotFound from './NotFound'
import LeaderBoard from './LeaderBoard'
import { isEmpty } from '../utils/commonUtils'
import PrivateRoute from './PrivateRoute'


class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />   
           {this.props.loading === true ? null :
            <Switch>
              <Route path='/' exact component={ Login } />
              <PrivateRoute path='/home' component={ HomePage } />
              <PrivateRoute path='/add' component={ NewPoll } />
              <PrivateRoute path='/questions/:id' component={ PollPage } />
              <PrivateRoute path='/leaderboard' component={ LeaderBoard } />
              <PrivateRoute component={ NotFound } />
            </Switch>
           }
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ questions, users }) {
  return {
    loading: isEmpty(questions) || isEmpty(users)
  }
}

export default connect(mapStateToProps)(App);
