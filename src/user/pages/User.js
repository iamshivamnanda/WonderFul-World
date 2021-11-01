import React,{useEffect,useState} from 'react';
import UserList from '../components/UserList/UserList';
import ErrorModal from '../../shared/components/Modal/ErrorModal';
import LoadingSpinner from '../../shared/Spinner/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const User = () => {
    const {isLoading,error,sendRequest,clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(()=>{
        const fetchusers = async ()=>{
            try{
                const response = await sendRequest('http://localhost:5000/api/users');
                setLoadedUsers(response.users);
            }catch(err){};
        }
        fetchusers();
    },[sendRequest]);
   
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}></ErrorModal>
            {isLoading?<LoadingSpinner asOverlay />:null}
            {!isLoading && loadedUsers &&<UserList items={loadedUsers} /> }
            

        </React.Fragment>
    )
}

export default User;