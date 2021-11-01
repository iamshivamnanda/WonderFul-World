import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import PlaceList from '../components/PlaceList/PlaceList';
import LoadingSpinner from '../../shared/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';




const UserPlaces = () => {
    const userid = useParams().userId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setloadedPlaces] = useState([]);
    useEffect(()=>{
        const fetchplaces = async()=>{
            try {
                const response = await sendRequest(`http://localhost:5000/api/places/user/${userid}`);
                // console.log(response);
                setloadedPlaces(response.places);
            } catch (error) {
                
            }
        };
        fetchplaces();
    },[sendRequest, userid])

    const placeDelHandler = (delPlaceId)=>{
        setloadedPlaces(prevplace => prevplace.filter(place => place.id !== delPlaceId));
    }
    return (
        <React.Fragment >
        {isLoading ? <LoadingSpinner asOverlay />:null}
        {<ErrorModal error={error} onClear={clearError} />}
        {loadedPlaces && !isLoading && <PlaceList items={loadedPlaces} onDelete={placeDelHandler} /> }
        
        </React.Fragment>
    )
}

export default UserPlaces
