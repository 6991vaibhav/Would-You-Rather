import { RECEIVE_USERS, UPDATE_USER } from '../actions/users'

export default function users(state = {}, action){
    switch(action.type){
        case RECEIVE_USERS: 
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER :
        const authedUser = action.updatedUser.authedUser
        const qid = action.updatedUser.qid
        const answer = action.updatedUser.answer
        console.log("state after save: ", state)
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                    ...state[authedUser].answers,
                    [qid]: answer
                    }
                }
            }
        default :
            return state
    }
}