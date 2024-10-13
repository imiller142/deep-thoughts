import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const initialFormState = { email: '', password: '' }
  const [formState, setFormState] = useState(initialFormState);
  const [login, { error }] = useMutation(LOGIN_USER);
  const [loginState, setLoginState] = useState('');
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState('');
    setFormState({
      ...formState,
      [name]: value,
    });
  };

// submit form
const handleFormSubmit = async event => {
  event.preventDefault();

  try {
    const { data } = await login({
      variables: { ...formState }
    });
    setLoginState("Succesfully Logged in!")
    setFormState(initialFormState);
    Auth.login(data.login.token);

    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
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
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
              {error && <div>Login failed</div>}
              {loginState && <div>{loginState}</div>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
