import axios from 'axios';
import { memo } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListUsers.modules.css';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

const ListUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
     getUsers();
  },[]);

  function getUsers(){
  axios.get("http://localhost:80/api/user/")
  .then(function(response){
    console.log(response.data);
    setUsers(response.data);
  });
}

 const handleDelete = (id) => {
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: "btn btn-success",
       cancelButton: "btn btn-danger me-2",
     },
     buttonsStyling: false,
   });

   swalWithBootstrapButtons
     .fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: "Yes, delete it!",
       cancelButtonText: "No, cancel!",
       reverseButtons: true,
     })
     .then((result) => {
       if (result.isConfirmed) {
         axios
           .delete(`http://localhost:80/api/user/${id}`)
           .then(() => {
             swalWithBootstrapButtons.fire(
               "Deleted!",
               "User has been deleted successfully.",
               "success",
             );

             setUsers((prev) => prev.filter((user) => user.id !== id));
           })
           .catch(() => {
             swalWithBootstrapButtons.fire(
               "Error!",
               "Failed to delete user.",
               "error",
             );
           });
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         swalWithBootstrapButtons.fire("Cancelled", "User is safe 🙂", "info");
       }
     });
 };

  
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