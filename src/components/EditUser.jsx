import { memo, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./create_user/form.css";

const EditUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getUser();
  }, [id]);

  const getUser = () => {
    axios.get(`http://localhost:80/api/user/${id}`).then((res) => {
      setFormData({
        name: res.data.name,
        email: res.data.email,
        mobile: res.data.mobile,
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:80/api/user", { ...formData, id })
      .then((res) => {
        console.log(res.data);
        navigate("/list-user");
      })
      .catch(console.error);
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
    </div>
  );
};

export default memo(EditUser);
