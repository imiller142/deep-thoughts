import React, { useState } from 'react';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from "../utils/auth"


const Signup = () => {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '' 
  };
  const [formState, setFormState] = useState(initialFormState);
  const [addUser, { error }] = useMutation(ADD_USER);
  const [passwordError, setPasswordError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('')

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    if (name === 'password' || name === 'passwordConfirm') {
      setPasswordError('');
    }
  };

  // submit form
// submit form (notice the async!)
const handleFormSubmit = async event => {
  event.preventDefault();
  
    // Check if passwords match
    if (formState.password !== formState.passwordConfirm) {
      console.error("Passwords do not match.");
      setPasswordError('Passwords do not match');
      return;
 // Exit the function if they don't match
    }


  // use try/catch instead of promises to handle errors
  try {

    // Execute addUser mutation and pass in variable data from form
    const { data } = await addUser({
      variables: { ...formState }
    });
    console.log(data);
    setFormState(initialFormState);
    setSubmissionSuccess('Successfully Submitted Form')
    Auth.login(data.addUser.token);
    
  } catch (e) {
    console.error(e);
  }
};

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Password'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
                <input
                className='form-input'
                placeholder='Confirm Password'
                name='passwordConfirm'
                type='password'
                id='passwordConfirm'
                value={formState.passwordConfirm}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {passwordError && <div>{passwordError}</div>}
            {error && <div>Sign up failed</div>}
            {submissionSuccess && <div>{submissionSuccess}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
