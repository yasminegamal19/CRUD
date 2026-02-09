import { memo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./create_user/form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   getUser();
  // }, []);

  const getUser = useCallback(() => {
    axios.get(`http://localhost:80/api/user/${id}`).then((res) => {
      setFormData({
        name: res.data.name,
        email: res.data.email,
        mobile: res.data.mobile,
      });
    });
  }, [id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.mobile.toString().trim()
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    axios
      .put("http://localhost:80/api/user", { ...formData, id })
      .then((res) => {
        console.log(res.data);
        toast.success("Record Updated Successfully!");

        setTimeout(() => {
          navigate("/list-user");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed To Update Record!");
      });
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>
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

export default memo(EditUser);
