import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'

class Poll extends Component {

    state = {
        selectedOption: ''
    }

    handleOnChange = (e) => {
        e.preventDefault();
        this.setState(() => ({
            selectedOption: e.target.value
        }))
    }

    render(){
        const { question, user, authedUser } = this.props;
        if(question === null){
            return (<p>This poll doesn't exist</p>)
        }
        
        const { id, optionOne, optionTwo } = question
        return (
            <Link to={`/questions/${id}`} className="poll">
                <div className="poll-info">
                    <h4>Would You Rather</h4>
                    <b>{optionOne.text}</b> OR <b>{optionTwo.text}</b>
                </div> 
            </Link>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
    const question = questions[id]
    const user = question ? users[question.author] : null
    return {
        authedUser,
        question,
        user
    }
}

// function mapDispatchToProps(dispatch){
//     return {
//         dispatch
//     }
// }

export default withRouter(connect(mapStateToProps)(Poll));