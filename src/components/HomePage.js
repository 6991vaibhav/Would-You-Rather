import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import Poll from './Poll'
import Header from './Header'

class HomePage extends Component {
    state = {
        answered: false
    }
    

    handleClick = (e) => {
        if(e.target.value === 'answered'){
            this.setState(() => ({
                answered: true
            }));
        } else {
            this.setState(() => ({
                answered: false
            }));
        }
        
    }
    render(){
        const {unansweredPolls, answeredPolls} = this.props
        let activeQuestionIds = [];

        if(this.state.answered){
            activeQuestionIds = answeredPolls
        } else {
            activeQuestionIds = unansweredPolls
        }

        return (
            <div>
                <div className="content">
                    <div className="btn-group">
                        <button 
                            onClick={this.handleClick}
                            value="unanswered"
                            className={this.state.answered ? '' : 'active'}
                        >
                        Unanswered Polls
                        </button>
                        <button 
                            onClick={this.handleClick}
                            value="answered"
                            className={this.state.answered ? 'active' : ''}
                        >
                        Answered Polls
                        </button>
                    </div>
                    <ul className="dashboard-list">
                        {
                            activeQuestionIds.map((id) => (
                                <li key={id}>
                                    <Poll id={id} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}) {
    
        const notAnsweredQuestions = Object.values(questions).filter((question) =>
            !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
    
        const answeredQuestions = Object.values(questions).filter((question) =>
            question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
        )
    
        return {
            unansweredPolls: Object.values(notAnsweredQuestions)
                .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
            answeredPolls: Object.values(answeredQuestions)
                .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id)
        }
    }

export default connect(mapStateToProps)(HomePage);