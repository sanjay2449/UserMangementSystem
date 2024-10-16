import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom'

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api/getall");
            setUsers(response.data);
        }

        fetchData();

    }, [])

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
            .then((respones) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
                toast.success(respones.data.msg, { position: 'top-right' })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

        <div className='userTable'>
            <Link to={"/add"} className='addButton'><i className="fa-solid fa-user-plus"></i></Link>
            <Link to={"/search"} className='addButton'><i className="fa-solid fa-magnifying-glass"></i></Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fname} {user.lname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.sector}</td>
                                    <td>{user.address}</td>
                                    <td>{user.salary}</td>
                                    <td>{user.mobile}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash-can"></i></button>
                                        <Link to={`/edit/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
export default User