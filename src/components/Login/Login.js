import React, { useState,useEffect } from 'react';
import { useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';




function epReducer(state, action){
if(action.type==="EMAIL"){
   return{
    ...state,
     emailValue:action.val,
     emailIsValid:action.val.includes("@") 
   }
}
 if(action.type==="EMAIL_BLUR"){
  return{
    ...state,
    emailValue: state.emailValue,
    emailIsValid:state.emailValue.includes("@")
  }
 }

 if(action.type==="PASSWORD"){
  return{
    ...state,
    passwordValue: action.valPassword,
    passwordIsValid: action.valPassword.trim().length>6,
  }
 }
 if(action.type==="PASSWORD_BLUR"){
    return{
      ...state,
      passwordValue:state.passwordValue,
      passwordIsValid: state.passwordValue.trim().length>6
    }
 }
 return state;
}

const initialEpState={
  emailValue:"",
  emailIsValid:undefined,
  passwordValue:"",
  passwordIsValid:undefined
}

const Login = (props) => {



  const [epState, dispatchEpState] =useReducer(  epReducer, initialEpState)

  const {passwordIsValid: passwordIsValidated} =epState
  const {emailIsValid : emailIsValidated}=epState

  
  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(()=>{

   const timerId= setTimeout(()=>{

      setFormIsValid( epState.emailIsValid && epState.passwordIsValid);
    },1000)

    return (()=>{
      clearTimeout(timerId)
    })
  },[emailIsValidated , passwordIsValidated]);


  const emailChangeHandler = (event) => {
    dispatchEpState({type:"EMAIL", val: event.target.value})
  };


  const validateEmailHandler = () => {
     dispatchEpState({type:"EMAIL_BLUR"});
  };



  const passwordChangeHandler = (event) => {
    dispatchEpState({type:"PASSWORD", valPassword:event.target.value})
  };



  const validatePasswordHandler = () => {
    dispatchEpState({type:"PASSWORD_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(epState.emailValue, epState.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            epState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={epState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            epState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={epState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;





