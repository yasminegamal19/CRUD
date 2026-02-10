import React, { useState } from "react";
import { databases, ID } from "../appWrite/appwriteConfig";

const DATABASE_ID = "698b02c7001e5f5f7163";
const COLLECTION_ID = "users";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        ...formData,
        userId: ID.unique(), // أو document id نفسه
      });
      alert("User created successfully!");
      setFormData({ name: "", email: "", mobile: "" });
    } catch (error) {
      console.error("Error creating user:", error);
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
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
