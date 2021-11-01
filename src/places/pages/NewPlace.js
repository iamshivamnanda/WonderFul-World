import React, { useCallback, useReducer ,useContext } from 'react';
import {useHistory} from 'react-router-dom';

import Input from '../../shared/components/FormELements/Input/Input';
import Button from '../../shared/components/FormELements/Button/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import './PlaceForm.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const history = useHistory();
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(formState.inputs);
    
    try {
      await sendRequest('http://localhost:5000/api/places','POST',JSON.stringify({
        title:formState.inputs.title.value,
    description:formState.inputs.description.value,
    address: formState.inputs.address.value,
    creator:auth.id.toString()
      }),
      {
        'Content-Type': 'application/json'
      });

      // console.log(response);
      history.push('/');
    } catch (error) {
      
    }



    // send this to the backend!
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      {isLoading?<LoadingSpinner asOverlay/>:null}
      {<ErrorModal error={error} onClear={clearError} />}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
