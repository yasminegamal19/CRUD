import React, { useState } from "react";
import { databases, ID } from "../appWrite/appwriteConfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const DATABASE_ID = "698b02c7001e5f5f7163";
const COLLECTION_ID = "users";

const CreateUser = () => {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.name || !formData.email || !formData.mobile) {
        toast.error("Please fill in all fields!");
        return;
      }
  
      setLoading(true); 
  
      try {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          userId: ID.unique(),
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
        });
  
        toast.success("Record Created Successfully!");
  
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error(error);
        toast.error("Failed To Create Record!");
      } finally {
        setLoading(false); 
      }
    };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Save"
          )}
        </button>{" "}
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

export default CreateUser;
