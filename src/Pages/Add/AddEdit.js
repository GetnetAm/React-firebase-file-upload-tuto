import React, { useState } from "react";
import './AddEdit.css'
import { toast } from "react-toastify";
import {fireDb} from "../../Config/firebasezz";


const initialstate = {
  name: "",
  email: "",
  contact: "",
};



function AddEdit() {
  const [state, setState] = useState(initialstate);
  const [data, setData] = useState({});

  const {name, email, contact}=state;




  const handleInputChange =(e)=>{
    const {name, value} =e.target;
    setState({...state, [name]: value});
    
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    if(!name || !email || !contact){
        toast.error("Please Provide value in Each input field")
    }
    else{
        fireDb.child("contacts").push(state, (err)=>{
            if(err){
                toast.error(err);
            }
            else{
                toast.success("contact Added Successfully");
            }
        })
    }
      
  }
  return (
    <div>
      <div style={{ marginTop: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignItems: "center",
          }} onSubmit={handleSubmit}
        >
        
        <label htmlFor="contact">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name......."
            value={name}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your Email......."
            value={email}
            onChange={handleInputChange}
          />

          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="name"
            placeholder="Contact......."
            value={contact}
            onChange={handleInputChange}
          />

          <butto type="submit">Save</butto>

        </form>
      </div>
    </div>
  );
}

export default AddEdit;
