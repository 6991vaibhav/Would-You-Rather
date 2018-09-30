import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { handleAdd } from '../actions/questions'

class NewPoll extends Component {

state = {
    toHome: false
}

handleSubmit = (e) => {
    e.preventDefault();
    const optionOneText = this.optionOneText.value
    const optionTwoText = this.optionTwoText.value
    this.props.dispatch(handleAdd({ optionOneText, optionTwoText }))

    this.setState(() => ({
        toHome: true
    }))
}

    render() {
        const { toHome } = this.state
        if(toHome === true){
            return (<Redirect to='/home' />)
        }
        return (
            <div className='new-poll'>
                <h3 className='center'>Would You Rather</h3>
                <form className='new-poll' onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        ref={(opt) => {this.optionOneText = opt}}
                        placeholder="Enter Option 1" 
                        className='textInput' />
                    <input 
                        type='text'
                        ref={(opt) => {this.optionTwoText = opt}}
                        placeholder="Enter Option 2" 
                        className='textInput' />
                    <button type='submit' className='btn'>Add</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewPoll);