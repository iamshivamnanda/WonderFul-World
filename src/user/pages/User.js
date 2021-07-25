import React from 'react';
import UserList from '../components/UserList/UserList';

const user = () => {
    const users = [
        {id:"user1",name:"Shivam Nanda",image:"https://image.shutterstock.com/image-photo/plitvice-lakes-croatia-beautiful-place-260nw-1050138794.jpg",count:3}
    ];
    return (
        <UserList items={users} />
    )
}

export default user;