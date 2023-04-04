import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  return (
    <div className='auth'>
      {/* rendering components here */}
      <Login />
      <Register />
    </div>
  )
};



const Login = () => {
  //  using state hook to capture values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [_, setCookies] = useCookies(['access_token']);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });

      setCookies('access_token', response.data.token);
      window.localStorage.setItem('userID', response.data.token);
      navigate('/');

    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label='Login' onSubmit={onSubmitHandler} />
  )
};



const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/auth/register', { username, password });

      alert('registration complete, you can log in now');

      setUsername('');
      setPassword('');


    } catch (err) {
      console.error(err);
    };
  };


  return (
    <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label='Register' onSubmit={submitHandler} />
  )
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {

  const userHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input type="text" id='username' value={username} onChange={userHandler} />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' value={password} onChange={passwordHandler} />
        </div>
        <button type='submit'>{label}</button>
      </form>
    </div>
  )
};


