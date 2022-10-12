import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles'
import Input from './Input';
import Icon from './Icon';
import axios from 'axios';
import { signin,signup } from '../../actions/auth'
//const isSignup = true;
const intialState = { firstName: '', lastName:'',email:'', password:'',confirmPassword:''}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => { 
    e.preventDefault();
    
    if(isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => { 
    setFormData({ ... formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => { setShowPassword((prevShowPassword) => !prevShowPassword); }
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }
  const googleSuccess = async (res) => {
    console.log(res);
    //googleSuccess(tokenResponse) 
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${res.access_token}` } },
    );
    console.log(userInfo);
    
    const result = userInfo?.data;
    const token = res?.access_token;

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = async (error) => {
    console.log(error);

    console.log('Fail');

  };
  const login = useGoogleLogin({
    onSuccess: 
      tokenResponse => { googleSuccess(tokenResponse) },
    
    onFailure: tokenResponse => { googleFailure(tokenResponse) },
  })

return (
  <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {
            isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )
          }
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password"
            handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
          {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
        </Grid>

        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          {isSignup ? 'Sign up' : 'Sign in'}
        </Button>

        <Button
          className={classes.googleButton}
          color='primary'
          fullWidth
          onClick={() => login()}
          //disabled={renderProps.disabled}
          startIcon={<Icon />}
          variant="contained">
          Google Sign in
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an accout? Sign In' : "Don't have an account? Sign up"}
            </Button>
          </Grid>
        </Grid>

      </form>
    </Paper>
  </Container>
)
};

export default Auth;