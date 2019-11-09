import React, { useState }from "react";
import { api } from '../utils/api';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    api().post('/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/BubblePage')
      })
      .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
      
      <button type="submit">Log In!</button>
    </form>
  );
};

export default Login;
