import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {getAllChoose, getAllUsers} from "../http/chooseAPI";
import {Context} from "../index";

const AllUsers = () => {
    const {users} = useContext(Context)

    useEffect(() => {
        getAllUsers().then(data => {
            users.setUsers(data)
            console.log(data)
        })
    }, [])

    return (
        <Container>
            {users.getUsers.map(u =>
            <p>{u.login}</p>)}
        </Container>
    );
};

export default AllUsers;