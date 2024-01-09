import React from 'react';
import UserItem from "./UserItem";
import './UserList.css'
import Card from "../../shared/components/UIElement/Card";
const UserList = (props) => {

    if(props.items.length === 0) {
        return <div className='center'>
            <Card>
                <h2>No users found.</h2>
            </Card>
        </div>
    }

    return (
        <ul className='users-list'>
            {props.items.map(user => (
                <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places.length}/>
            ))}
        </ul>
    )

};

export default UserList;