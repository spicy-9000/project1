import React from "react";
import { useState } from 'react'
function Profile(){
  
     const [file,setFile]=useState(null);
            const uploadFile=async(event)=>{
              event.preventDefault();
              const sdata=new FormData();
              sdata.append('file',file);
                const response = await fetch("http://localhost:4000/api/image-upload", {
                  method: 'POST',
                  body: sdata
                });
                const msg = await response.text();
                alert(msg);
            };
    return(
<div className='image-upload'> 
            <form onSubmit={uploadFile} >
              <label for="image">UPLOAD THE IMAGE</label>
              <input type="file" accept="image/*" onChange={(e)=> setFile(e.target.files[0])} />
              <button type="submit" style={{justifyContent:"center"}}>submit</button>
            </form>
            </div>
    );
}
const styles={
  button:{
   padding: "12px",
    fontSize: "16px",
    backgroundColor: "#43b558",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignItems:"center"
  }
}
export default Profile;
{/*function Profile(){
  
     const [file,setFile]=useState(null);
            const uploadFile=async(event)=>{
              event.preventDefault();
              const sdata=new FormData();
              sdata.append('file',file);
                const response = await fetch("http://localhost:4000/api/image-upload", {
                  method: 'POST',
                  body: sdata
                });
                const msg = await response.text();
                alert(msg);
            };
    return(//for profile uploading 
<div className='image-upload'> 
            <form onSubmit={uploadFile}>
              FILE:<input type="file" accept="image/*" onChange={(e)=> setFile(e.target.files[0])} />
              <input type='submit' value="save info"/>
            </form>
            </div>
    );
}*/}