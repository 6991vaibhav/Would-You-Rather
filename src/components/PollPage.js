import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import Option from './Option'
import {handleAnswerQuestion} from '../actions/questions'


class PollPage extends Component {
    handleVote = (vote) => {
        const {dispatch, question} = this.props
        dispatch(handleAnswerQuestion(question.id, vote))
    }
    render() {
        const { question, user, authedUser } = this.props;
        const { avatarURL, name } = user;
        const noOfQuestionsAsked = user.questions.length;
        const noOfQuestionsAnswered = Object.keys(user.answers).length
        return (
            <div className="content">
            <h2>Would You Rather</h2>
                <div className='question-info'>
                    <img 
                    src={ avatarURL }
                    alt={`Avatar of ${name}`}
                    className='avatar' />
                    <h4>Asked: {noOfQuestionsAsked}</h4>
                    <h4>Answered: {noOfQuestionsAnswered}</h4> 
                    <br></br>            
                    <Option questionId={question.id} optionName="optionOne" onClick={this.handleVote}/>
                    <Option questionId={question.id} optionName="optionTwo" onClick={this.handleVote}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, props) {
    const { id } = props.match.params;
    const question = questions[id]
    const user = users[authedUser]
    return {
        question,
        authedUser,
        user,
    }
}

export default connect(mapStateToProps)(PollPage);