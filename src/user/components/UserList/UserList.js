import React from 'react';
import  './UserList.css';
import UserItem from '../UserItem/UserItem';
import Card from "../../../shared/components/Card/Card";

const UserList = (props) => {
    if(props.items.length === 0){
        return <div className="center">
            <Card>
            <h2>No Users Found</h2>
            </Card>
        </div>
    }
    return (
        <ul className="users-list">
            {props.items.map(user=>{
                return <UserItem key={user.id} id={user.id} name={user.name} image={user.image} count={user.count} />
            })}
        </ul>
    )
}

export default UserList;