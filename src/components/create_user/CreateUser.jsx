import axios from "axios";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in all fields!"); 
      return; 
    }

    axios
      .post("http://localhost:80/api/user/save", formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Record Created Successfully!");
        setTimeout(() => {
          navigate("/list-user");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed To Create Record!");
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          type="number"
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
