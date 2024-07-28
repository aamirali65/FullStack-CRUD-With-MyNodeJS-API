import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { deleteUser, getUser } from "../api";

const Fetch = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUsers(response.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire('Error!', 'There was a problem deleting the user.', 'error');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-5">
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
          <input
            type="text"
            className="p-1 px-2"
            placeholder="Type to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to={"/add-user"}>
            <button className="flex flex-row gap-2 items-center bg-white text-black px-5 py-2">
              <span className="fa fa-user"></span>Add New User
            </button>
          </Link>
        </div>
      </div>

      <div id="table" className="w-full border">
        <table className="w-full text-left">
          <thead className="border border-b-black">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Date Created</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.filter((user) => {
              if (searchTerm === "") {
                return user;
              } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user;
              }
              return null;
            }).map((user, index) => (
              <tr key={user._id} className="border my-2">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 flex items-center">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">{user.createdAt}</td>
                <td className="px-4 py-2">
                  <Link to={`/edit-user/${user._id}`}><button className="fa fa-edit mr-3 text-2xl text-sky-500"></button></Link>
                  <button className="fa fa-trash text-2xl text-red-500" onClick={() => handleDelete(user._id)}></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fetch;
