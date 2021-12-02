import React, { useEffect, useState,useContext } from 'react';
import { useParams ,useHistory} from 'react-router-dom';

import Input from '../../shared/components/FormELements/Input/Input';
import Button from '../../shared/components/FormELements/Button/Button';
import Card from '../../shared/components/Card/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';


const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const history = useHistory();
  const auth = useContext(AuthContext);

  // console.log(placeId);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setloadedPlace] = useState(null);
  // console.log(placeId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  

  useEffect(() => {
    const fetchPlace = async()=>{
      const response = await sendRequest(process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`);
      setloadedPlace(response.place);
      setFormData(
            {
              title: {
                value: response.place.title,
                isValid: true
              },
              description: {
                value: response.place.description,
                isValid: true
              }
            },
            true
          );
      // console.log(response.place);
     
    }
    fetchPlace();
    
  }, [sendRequest,placeId,setFormData]);

  // if(loadedPlace){
  //   setFormData(
  //     {
  //       title: {
  //         value: loadedPlace.title,
  //         isValid: true
  //       },
  //       description: {
  //         value: loadedPlace.description,
  //         isValid: true
  //       }
  //     },
  //     true
  //   );
  // }

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(process.env.REACT_APP_BACKEND_URL+`/places/${placeId}`,'PATCH',JSON.stringify({
     title:formState.inputs.title.value,
     description:formState.inputs.description.value
   }),{
    Authorization:"Bearer " + auth.token,
     'Content-Type':'application/json'
   });
  //  console.log("DONE");
    history.push('/');
    } catch (error) {
      
    }
   
    
  };

  if (!loadedPlace) {
    return (
      <div className="center">
        <Card>
        <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  
  return (
      <React.Fragment >
        {isLoading ? <LoadingSpinner asOverlay />:null}
        {<ErrorModal error={error} onClear={clearError} />}
        {loadedPlace && !isLoading &&  <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        
      
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={loadedPlace.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={loadedPlace.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form> }
    
    </React.Fragment>
  );
};

export default UpdatePlace;
