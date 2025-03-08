import React,{useState} from "react";
import RegisterUser from "./components/RegisterUser";
import PostManagement from "./components/PostManagement";

function App() {
  const [bg, setBg] = useState("#7A2424");

  return (
    <div style={{ background: bg }}>
      <input type="color" onChange={(e) => setBg(e.target.value)} />
      <h1>User Registration</h1>
      <RegisterUser />
      <h1>Post Management</h1>
      <PostManagement />
    </div>
  );
}

export default App;
