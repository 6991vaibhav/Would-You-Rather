import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading';
import { handleInitialData } from './shared'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION = 'ADD QUESTION'

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAdd({ optionOneText, optionTwoText }) {
    return (dispatch, getState) => {
        const {authedUser} = getState();
        dispatch(showLoading())
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        }) .then(() => {
            dispatch(handleInitialData())
            dispatch(hideLoading())
        })
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return _saveQuestionAnswer({authedUser, qid, answer})
            .then(() => {
                dispatch(handleInitialData())
                dispatch(hideLoading())
            })
    }

}