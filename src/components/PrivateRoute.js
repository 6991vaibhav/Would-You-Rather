import React, {Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEmpty} from "../utils/commonUtils";
import Header from './Header'


const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            isAuthenticated
                ?
                <Fragment>
                    <Header/>
                    <div>
                        <Component {...props}/>
                    </div>
                </Fragment>
                : <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
        )
    }}/>
)

function mapStateToProps({authedUser}) {
    return {
        isAuthenticated: !isEmpty(authedUser)
    }
}

export default connect(mapStateToProps, null, null, {pure: false,})(PrivateRoute)