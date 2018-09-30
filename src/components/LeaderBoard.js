import React from 'react'
import { connect } from 'react-redux'
import LeaderboardInfo from './LeaderboardInfo'

const LeaderBoard = (props) => {
    const { userIds } = props
    return (
        <div className='content' >
        <h1>LeaderBoard</h1>
        { 
            userIds.map((id) => (
                <LeaderboardInfo key={id} id={id} />
            ))
        }
        </div>
    )
}

function mapStateToProps({ users }){

    return {
        userIds: Object.keys(users).sort((a,b) => {
            (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)
        })
    }
}

export default connect(mapStateToProps)(LeaderBoard);
