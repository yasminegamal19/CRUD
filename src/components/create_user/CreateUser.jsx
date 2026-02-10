// import axios from "axios";
// import { memo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./form.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CreateUser = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.mobile) {
//       toast.error("Please fill in all fields!");
//       return;
//     }

//     axios
//       .post("http://localhost:80/api/user/save", formData)
//       .then((response) => {
//         console.log(response.data);
//         toast.success("Record Created Successfully!");
//         setTimeout(() => {
//           navigate("/list-user");
//         }, 2000);
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Failed To Create Record!");
//       });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="form-container">
//       <h2>Create User</h2>
//       <form onSubmit={handleSubmit} className="user-form">
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <label>Phone:</label>
//         <input
//           type="number"
//           name="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//         />

//         <button type="submit" className="btn-save">
//           Save
//         </button>
//       </form>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default memo(CreateUser);









import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, ID } from "../../appWrite/appwriteConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";

const DATABASE_ID = "698b02c7001e5f5f7163";
const COLLECTION_ID = "users";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        formData,
      );
      toast.success("Record Created Successfully!");
      setTimeout(() => {
        navigate("/list-user");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Create Record!");
    }
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <button type="submit" className="btn-save">
          Save
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default memo(CreateUser);
