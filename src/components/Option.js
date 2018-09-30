import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Option extends Component {
    handleClick = (e) => {
        e.preventDefault()
        const {onClick, optionName} = this.props
        onClick(optionName)
    }
    render(){
        const {option, showResults, isVoted, percentage} = this.props
        const {text, votes} = option

        return (
            showResults === false ?
            <Link to="#" onClick={this.handleClick}>
                <div className={isVoted ? (" option selected-option") : 'option'}>
                   <h3>{text}</h3>
                   {showResults === true &&
                    (<h3>Numbero Of Votes: {votes.length} ({percentage}%)</h3>)
                    }
                </div>
            </Link>
            :
            <div>
                <div className={isVoted ? (" option selected-option") : 'option'}>
                <h3>{text}</h3>
                {showResults === true &&
                    (<h3>Numbero Of Votes: {votes.length} ({percentage}%)</h3>)
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {questionId, optionName}) {
    const question = questions[questionId]
    const option = question[optionName]
    const currentUser = users[authedUser]

    return {
        option,
        isVoted: option.votes.includes(authedUser),
        showResults: Object.keys(currentUser.answers).includes(questionId),
        percentage: ((option.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2),
        optionName
    }
}

export default connect(mapStateToProps)(Option);