import { setAuthedUSer, SET_AUTHED_USER } from '../actions/login'

export default function authedUser(state = "", action) {
    switch(action.type) {
        case SET_AUTHED_USER: 
            return action.id
        default: 
            return state
    }
}