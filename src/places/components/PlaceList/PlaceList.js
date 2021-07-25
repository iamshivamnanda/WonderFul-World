import React from 'react';
import Card from "../../../shared/components/Card/Card";
import PlaceItem from '../PlaceItem/PlaceItem'; 
import Button from "../../../shared/components/FormELements/Button/Button"
import './PlaceList.css'


const PlaceList = (props) => {
   if(props.items.length === 0 ){
       return <div className='place-list center'>
           <Card>
               <h2>No Places Added. Share A Place</h2>
               <Button to="/places/new">Share</Button>
           </Card>
       </div>
   }
   return <ul className='place-list'>
       {props.items.map(place=> <PlaceItem key={place.id} id={place.id} image={place.imageurl} title={place.title} description={place.description}
        address={place.address} createrId={place.createrId} location={place.location}
       />)}
   </ul>
}

export default PlaceList
