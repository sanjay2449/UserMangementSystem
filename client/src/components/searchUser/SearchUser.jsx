import React, { useState } from 'react';
import './searchUser.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SearchUser = () => {
    const [Key, setKey] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async (key) => {
        try {
            const response = await fetch(`http://localhost:8000/api/findKey/${key}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
            .then((response) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
                toast.success(response.data.msg, { position: 'top-right' });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="SearchUser">
            <h2>Search User Data</h2>
            <Link to={"/"} className='addButton'><i className="fa-solid fa-backward"></i></Link>
            <input
                type="text"
                value={Key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter search key"
            />
            <button onClick={() => handleSearch(Key)}>Search</button>

            <div className='userTable'>
                <Link to={"/add"} className='addButton'><i className="fa-solid fa-user-plus"></i></Link>
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
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
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fname} {user.lname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.sector}</td>
                                    <td>{user.address}</td>
                                    <td>{user.salary}</td>
                                    <td>{user.mobile}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteUser(user._id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <Link to={`/edit/${user._id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchUser;
