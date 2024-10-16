import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    fname: "",
    lname: "",
    email: "",
    sector: "",
    address: "",
    salary: "",
    mobile: ""
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" })
        navigate("/")
      })
      .catch(error => console.log(error))
  }

  return (
    <div className='addUser'>
      <Link to={"/"} className='addButton'><i className="fa-solid fa-backward"></i></Link>
      <Link to={"/search"} className='addButton'><i className="fa-solid fa-magnifying-glass"></i></Link>
      <h2>Add new user</h2>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
        </div>
        <div className="inputGroup">
          <label htmlFor="sector">Department</label>
          <input type="text" onChange={inputHandler} id='sector' name="sector" autoComplete='off' placeholder='Department' />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address</label>
          <input type="text" onChange={inputHandler} id='address' name="address" autoComplete='off' placeholder='Address' />
        </div>
        <div className="inputGroup">
          <label htmlFor="salary">Salary</label>
          <input type="text" onChange={inputHandler} id='salary' name="salary" autoComplete='off' placeholder='Salary' />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" onChange={inputHandler} id='mobile' name="mobile" autoComplete='off' placeholder='Mobile' />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  )
}

export default Add