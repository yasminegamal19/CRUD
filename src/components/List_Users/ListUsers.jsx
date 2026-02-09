import axios from 'axios';
import { memo } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListUsers.modules.css';
const ListUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
     getUsers();
  },[]);

  function getUsers(){
  axios.get("http://192.168.1.5/api/user/")
  .then(function(response){
    console.log(response.data);
    setUsers(response.data);
  });
}

 const handleDelete = (id) => {
  axios.delete(`http://192.168.1.5/api/user/${id}/delete`).then(function (response) {
    console.log(response.data);
    getUsers();
  });
 }
  
  return (
    <div>
      <h2>List Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <Link to={`/edit-user/${user.id}`} className="btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(ListUsers);