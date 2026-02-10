import React, { useEffect, useState } from "react";
import { databases } from "../appWrite/appwriteConfig";

const DATABASE_ID = "698b02c7001e5f5f7163";
const COLLECTION_ID = "users";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
      );
      setUsers(response.documents);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      fetchUsers(); // refresh after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.$id}>
            {user.name} - {user.email} - {user.mobile}{" "}
            <button onClick={() => deleteUser(user.$id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUsers;
