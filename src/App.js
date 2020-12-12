import React, { useState, useReducer } from 'react';
import axios from 'axios';
import {env} from './config.js';
const { host } = env;

const initialState = {
  name: '',
  message: '',
  email: '',
  sent: false,
}

const reducer = (state, action) => {
  if (action.type === 'reset') {
    return initialState;
  }

  const result = {...state};
  result[action.type] = action.value;
  return result;
}

const Contact = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { name, message, email, sent, } = state
  const [buttonText, setButtonText] = useState('Send Message')

  const formSubmit = (e) => {
    e.preventDefault()
  
    setButtonText('...sending');
  
    let data = {
        name: state.name,
        email: state.email,
        message: state.message
    }
    
    axios.post(`${host}/api/v1`, state)
    .then( res => {
      dispatch({type: {...state, sent: true }})
      dispatch({type: 'reset'})
    })
    .catch( () => {
      console.log('Message not sent')
    })
  }

    const onChange = e => {
      const { name, value } = e.target;
      dispatch({ type: name, value });
  };

    return(
      <form className="contact-form" onSubmit={ (e) => formSubmit(e)}>
      <label class="message" htmlFor="message-input">Your Message</label>
      <textarea onChange={onChange} name="message" class="message-input" type="text" placeholder="Please write your message here" value={state.message} required/>
    
      <label class="message-name" htmlFor="message-name">Your Name</label>
      <input onChange={onChange} name="name" class="message-name" type="text" placeholder="Your Name" value={state.name}/>
    
      <label class="message-email" htmlFor="message-email">Your Email</label>
      <input onChange={onChange} name="email" class="message-email" type="email" placeholder="your@email.com" required value={state.email} />
    
      <div className="button--container">
          <button type="submit" className="button button-primary">{ state.buttonText }</button>
      </div>
    </form>
    );
}

export default Contact;