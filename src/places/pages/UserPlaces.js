import React from 'react';
import { useParams } from "react-router-dom";
import PlaceList from '../components/PlaceList/PlaceList';

const Dummy_DATA =[
    {
        id:'p1',
        title:"Empire State Building",
        address:"20 W 34th St, New York, NY 10001, United States",
        description:"Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.",
        imageurl:"https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/06/30/Pictures/_a15d5314-baac-11ea-a2a7-d359f39d1b90.jpg",
        location:{
            lat:40.7484405,
            lng:73.9856644
        },
        createrid:'user1'
    },
    {
        id:'p2',
        title:"Empire State Building",
        address:"20 W 34th St, New York, NY 10001, United States",
        description:"Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.",
        imageurl:"https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/06/30/Pictures/_a15d5314-baac-11ea-a2a7-d359f39d1b90.jpg",
        location:{
            lat:40.7484405,
            lng:73.9856644
        },
        createrid:'user2'
    }
]

const UserPlaces = () => {
    const userid = useParams().userId;
    const loadedPlaces = Dummy_DATA.filter(place => place.createrid === userid);
    return (

       <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces
