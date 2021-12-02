import React from 'react';
import  './UserItem.css';
import {Link} from "react-router-dom";
import Avatar from "../../../shared/components/Avatar/Avatar";
import Card from '../../../shared/components/Card/Card';
const UserItem = (props) => {
    return (
        <li className="user-item">
            <Card className="user-item__content" style={{padding:0}}>
                <Link to={`${props.id}/places`}>
                <div className="user-item__image"> 
                <Avatar image= {process.env.REACT_APP_ASSET_URL+`/${props.image}`} alt="//" />
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <h3>{props.count} {props.count ===1 ? "Place":"Places" }</h3>
                    </div>
                    </Link>
            </Card>
        </li>
    )
}

export default UserItem;
