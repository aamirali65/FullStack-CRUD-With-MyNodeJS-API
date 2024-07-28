import axios from "axios";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from "../api";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      Swal.fire({
        title: 'Success!',
        text: 'User created successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/')
      });
      console.log('User created:', response);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating the user',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center m-5'>
      <div
        id="header"
        className="flex items-center justify-between w-full p-5 bg-sky-500"
      >
        <div id="logo" className="text-white text-2xl">
          <h1>
            User <strong>Management</strong>
          </h1>
        </div>
        <div id="nav" className="flex gap-5">
          <Link to={'/'}>
            <button className="flex flex-row gap-2 items-center bg-white text-black px-5 py-2">
              <span className="fa fa-user-plus"></span>Show Users
            </button>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-[#ECECEC] w-full m-2 p-5 flex flex-col gap-6 border border-black">
        <div id="input" className="flex justify-between gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-r-sky-500 border-r-4"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-r-sky-500 border-r-4"
          />
        </div>
        <div id="input" className="flex justify-between gap-5">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border border-r-sky-500 border-r-4"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border border-r-sky-500 border-r-4"
          />
        </div>
        <button className="w-full bg-sky-500 p-3 text-white">Add User</button>
      </form>
    </div>
  );
}

export default Add;
