// src/Accordion.js
import React, { useState } from "react";
import UserProfile from "./UserProfile";
const AccordionItem = ({ id,title, content, profile, isOpen, onToggle }) => {
  return (
    <div>
      <div
        onClick={onToggle}
        style={{
          cursor: "pointer",
          padding: "10px",
          border: "1px solid #ccc",
          margin: "5px 0",
          background: "#f1f1f1",
        }}
      >
        <h3>{title}</h3>
        <UserProfile userId={id} userName={profile?.name} userGender={profile?.gender} userAge={profile?.age}  />
        {isOpen && (
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderTop: "none",
              background: "#fff",
            }}
          >
            {content}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={item.id}
          title={item.username}
          content={item.posts?.map((post) => (
            <div key={post.id}>
              <h4>{post.content}</h4>
              <p>{post.createdAt}</p>
            </div>
          ))}
          profile={item.profile}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
