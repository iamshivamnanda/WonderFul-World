import React, { useState,useContext } from 'react';

import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormELements/Input/Input';
import Button from '../../shared/components/FormELements/Button/Button';
import LoadingSpinner from '../../shared/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import {useHttpClient} from "../../shared/hooks/http-hook";
import { AuthContext } from '../../shared/context/auth-context';
import ImagePicker from '../../shared/components/FormELements/ImagePicker/ImagePicker';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value:null,
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler =async  event => {
    event.preventDefault();
    // console.log(formState.inputs);
    if(isLoginMode) {
    await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users/login','POST',JSON.stringify({
      email:formState.inputs.email.value,
      password:formState.inputs.password.value
    }),
    {
      'Content-Type': 'application/json'
    }).then( res => {
      auth.login(res.userId,res.token);
    }).catch(err =>{
     
    })} 
    else{
      const formData = new FormData();
      formData.append('name',formState.inputs.name.value);
      formData.append('email',formState.inputs.email.value);
      formData.append('password',formState.inputs.password.value);
      formData.append('image',formState.inputs.image.value);
      await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users/signup','POST',
      formData
      ).then( res => {
      auth.login(res.userId,res.token);
    }).catch(err =>{
     
    })
  }
  };

  return (
    
    <Card className="authentication">
      <ErrorModal error={error} onClear={clearError} > </ErrorModal>
      {isLoading ? <LoadingSpinner asOverlay> </LoadingSpinner> : null}

      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && <ImagePicker id='image' center  onInput={inputHandler} />}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
