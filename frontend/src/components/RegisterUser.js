import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "./Accordion";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const register = async () => {
    await axios.post("http://localhost:5000/api/users", { email, password });
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setUsers(users.filter(user=>user.id!==id))

  };


  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button onClick={register}>Register</button>
     
          <Accordion items={users} />

       
    </div>
  );
};

export default RegisterUser;
