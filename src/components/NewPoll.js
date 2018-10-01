import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { handleAdd } from '../actions/questions'

class NewPoll extends Component {

state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
}

handleChange = (e) => {
    const {value, id} = e.target
    this.setState(() => ({[id]: value}))
}

handleSubmit = (e) => {
    e.preventDefault();

    const {optionOneText, optionTwoText } = this.state;
    this.props.dispatch(handleAdd({ optionOneText, optionTwoText }))

    this.setState(() => ({
        toHome: true,
        optionOneText: '',
        optionTwoText: ''
    }))
}

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state
        if(toHome === true){
            return (<Redirect to='/home' />)
        }
        return (
            <div className='new-poll'>
                <h3 className='center'>Would You Rather</h3>
                <form className='new-poll' onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        id='optionOneText'
                        placeholder="Enter Option 1" 
                        className='textInput'
                        onChange={this.handleChange}/>
                    <input 
                        type='text'
                        id='optionTwoText'
                        placeholder="Enter Option 2" 
                        className='textInput'
                        onChange={this.handleChange}/>
                    <button 
                        disabled={optionOneText === '' && optionTwoText === ''} 
                        type='submit' 
                        className='btn'
                    >
                    Add
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewPoll);