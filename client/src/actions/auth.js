import {AUTH } from '../constants/actionTypes'
import * as api from '../api/index.js';

// Action Creators

export const signin = (formData,navigate) => async (dispatch) => {
    try {
        // login user
        const {data} = await api.signIn(formData);

        dispatch({ type: AUTH, data});


        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData,navigate) => async (dispatch) => {
    try {
         // sign up user
         const {data} = await api.signUp(formData);

         dispatch({ type: AUTH, data});
 
 
         navigate('/');
    } catch (error) {
        console.log(error);
    }
}