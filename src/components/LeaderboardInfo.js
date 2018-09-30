import React from 'react'
import { connect } from 'react-redux'

const LeaderboardInfo = (props) => {
    const { users, id } = props
    const noOfQuestionsAsked = users[id].questions.length
    const noOfQuestionsAnswered = Object.keys(users[id].answers).length
    return (
        <div className='leaderBoard'>
            <div className='leaderBoard-info'>
                <h3>{users[id].name}</h3>
                <img 
                src={ users[id].avatarURL }
                alt={`Avatar of ${users[id].name}`}
                className='avatar' />
                <p> No. of Questions Asked:  <b>{ noOfQuestionsAsked }</b></p>
                <p> No. of Questions Answered:  <b>{ noOfQuestionsAnswered }</b></p>
            </div>
        </div>
    )
}

function mapStateToProps({ users }, { id }) {
    return {
        users,
        id
    }
}

export default connect(mapStateToProps)(LeaderboardInfo);

