import React, { useState } from "react";
import axios from "axios";

const UserProfile = ({ userId, userName, userGender, userAge }) => {
  const [name, setName] = useState(userName);
  const [gender, setgender] = useState(userGender);
  const [age, setage] = useState(userAge);
  const [inputType, setInputType] = useState(true);

  const updateProfile = async () => {
    alert(userId)
    await axios.put(`http://localhost:5000/api/users/${userId}}`, {
      name,
      gender,
      age,
    });
    setInputType((input)=>!input)
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={inputType}
        placeholder="Name"
      />
      <input
        value={gender}
        onChange={(e) => setgender(e.target.value)}
        disabled={inputType}
        placeholder="gender"
      />
      <input
        value={age}
        onChange={(e) => setage(e.target.value)}
        disabled={inputType}
        placeholder="age"
        type="number"
      />
      <div>
       
        {!inputType ? <><button onClick={() => setInputType(input =>  !input )}>cancel</button> <button onClick={updateProfile}>Update Profile</button></>: <button onClick={() => setInputType((input) => !input)}>Edit</button>}
      </div>
    </div>
  );
};

export default UserProfile;
