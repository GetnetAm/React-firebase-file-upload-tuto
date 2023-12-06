import React, { useEffect, useState } from "react";

import { Button, Form, Grid, Loader } from "semantic-ui-react";

import { storage } from "../firebase";
import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};

function AddEditUser() {
  const [data, setData] = useState(initialState);
  const { name, email, info, contact } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(()=>{
    const uploadFile =()=>{
        const name = new Date().getTime() + file.name;
        const storageRef =ref(storage, file.name);
        const uploadTask =uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) =>{
            const progress=
            (snapshot.bytesTransferred / snapshot.totalBytes) *100;
            setProgress(progress);
            switch(snapshot.state){
                case "paused":
                    console.log("upload is pause");
                    break

                    case "running":
                        console.log("upload is Running");
                        break;
                        default:
                            break;
            }
        },
        (error)=>{
            console.log(error);
        },
        ()=> {

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
                setData((prev)=>({...prev, img: downloadURl}));

            });
        }
        );
    };

    file && uploadFile()
  }, [file])

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
    
  };

  const validate =()=>{
    let errors ={};

    if(!name){
        errors.name="Name is Required"
    }
    if(!email){
        errors.email="Email is Required"
    }

    if(!info){
        errors.info="Info is Required"
    }

    if(!contact){
        errors.info="contact is Required"
    }

    return errors
  }

  const handlesubmit=(e)=>{
    e.preventDefault();
    let errors =validate();

    if(Object.keys(errors).length) return setErrors(errors);
  };

  return (
    <div>
      <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              {isSubmit ? (
                             <Loader active inline="centered" size='huge' />
                             ) : (
              <>
                <h2>Add User</h2>
                <Form onSubmit={handlesubmit}>
                  <Form.Input
                    label="Name"
                    placeHolder="Enter Name"
                    name="name"
                    error={errors.name ? {content: errors.name}: null}
                    onChange={handleChange}
                    value={name}
                    autoFocus
                  />

                  <Form.Input
                    label="Email"
                    placeHolder="Enter Email"
                    name="email"
                    error={errors.email ? {content: errors.email}: null}
                    onChange={handleChange}
                    value={email}
                    autoFocus
                  />
                  <Form.TextArea
                    label="Info"
                    placeHolder="Enter Info"
                    name="info"
                    error={errors.info ? {content: errors.info}: null}
                    onChange={handleChange}
                    value={info}
                    autoFocus
                  />

                  <Form.Input
                    label="Contact"
                    placeHolder="Enter Contact"
                    name="contact"
                    error={errors.contact ? {content: errors.contact}: null}
                    onChange={handleChange}
                    value={contact}
                    autoFocus
                  />

                        <Form.Input
                         label="Upload"
                         type="file"
                            
                            onChange={(e) =>setFile(e.target.files[0])}
                            
                            />

                        <Button primary type="submit" disabled={progress !== null && progress < 100} >Submit</Button>
                </Form>
              </>
              )} 
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default AddEditUser;
