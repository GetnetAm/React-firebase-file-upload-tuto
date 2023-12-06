import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { Button, TextArea } from 'semantic-ui-react'
import { db, storage } from '../../firebaseConfig';
import { toast } from 'react-toastify';

function AddArticle() {
  const [formData, setFormData]=useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress]=useState(0);


  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});

  };

  const handleImageChange=(e)=>{
    setFormData({...formData, image: e.target.files[0]})

  }

  const handlePublish=()=>{
    if(!formData.title || !formData.description || !formData.image){
      alert("plase fill all info")
      return;
    }
    const storageRef =ref(storage, `/images/${Date.now()} ${formData.image.name}`);

   const uploadImage= uploadBytesResumable(storageRef, formData.image)

   uploadImage.on("state_changed",
   (snapshot) =>{
    const progressPercent =Math.round(

    (snapshot.bytesTransferred /snapshot.totalBytes)*100
    );
    setProgress(progressPercent);
   },
   (err)=>{
    console.log(err);
   },
   ()=>{
    setFormData({
      title: "",
      description: "",
      image: "",
    });

    getDownloadURL(uploadImage.snapshot.ref)
    .then((url)=>{
      const articleRef =collection(db, "Articles");
      addDoc(articleRef, {
        title: formData.title,
        description:formData.description,
        imageUrl: url,
        createdAt: Timestamp.now().toDate(),
      })

      .then(()=>{
        toast("Article is add succesfullly", {type: "success"});
        setProgress(0)
      })
      .catch((err)=>{
        toast("err adding article", {type: "error"});
      })
    })
   }
   );
  };
  return (
    <div className='border p-3 mt-3 bg-light' style={{position:"fixed"}}>
      <h2>Create Article</h2>
      <label htmlFor=''>Title</label>
      <input type='text' name='title'
       className='form-control' value={formData.title} onChange={(e)=>handleChange(e)} />
      <label htmlFor='textarea'>Description</label>
      <TextArea name="description" className="form-control" value={formData.description} onChange={(e)=>handleChange(e)} />

      <label htmlFor=''>Image</label>
      <input type='file' name='image' accept='image/*' className='form-control' onChange={(e)=>handleImageChange(e)} />








    {progress === 0 ? null: (

<div className='progress'>
<div className='progress-bar progress-bar-striped mt-2'
 style={{width: `${progress}%`}}>
  {`uploading image ${progress}%`}
</div>



</div>
    
    )}


    







<Button type='submit' className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</Button>


      
    </div>
    
  )
}

export default AddArticle
