import React, { useState } from 'react';
import NavBar from '../Components/Navbar';
import '../App.css';
import { app, db, storage } from '../firebase';
import { getStorage, ref,uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'; 
import { useNavigate } from 'react-router-dom';
import { FcApproval } from "react-icons/fc";

function Add() {
  const [name, setName] = useState("");
  const [stars, setStars] = useState("");
  const [Genre, setGenre] = useState("");
  const [coverPic, setPic] = useState("");
  const [des, setDes] = useState("");
  const [year , setYear]=useState("");
  const [done, setD] = useState(false);
  const storage=getStorage(app);
  const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const imgRef=ref(storage,`uploads/images/${v4()}`);
    const ul=await uploadBytes(imgRef,coverPic)

    const movieData = {
      name: name,
      stars: stars,
      Genre: Genre,
      des: des,
      year:year,
      imgurl:ul.ref.fullPath,
    };

    const response = await fetch('https://r-task-95497-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    });

    if (response.ok) {
      console.log('Movie added successfully!');
      setName("");
      setDes("");
      setGenre("");
      setPic("");
      setStars("");
      setD(true);
    } else {
      console.error('Failed to add movie');
    }
    setD(true)
  }

  return (
   <>
{done && (

      <center>
         <NavBar/>
      <div class="card border-dark mb-3" style={{marginLeft:"500px",width: "420px" , marginTop:"220px",marginLeft:"20px",borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#131418',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px'}}>
      <div class="card-body text-dark">
        <h5 class="card-title" style={{ color: "#ccaa62",fontWeight:"800"}}>Sucess <FcApproval/> </h5>
        <p class="card-text" style={{ color: "#ccaa62",fontWeight:"700"}}>Movie Listed Sucessfully</p>
        <button style={{backgroundColor: "#ccaa62", 
                borderColor: "#ccaa62", 
                color: "white", 
                fontWeight: "900" ,}} className="btn" onClick={e=>{navigate("/"); setD(false)}}>Home</button>
      </div>
    </div>
    </center>
    )}

{!done &&(<>
     <NavBar/>
     <center>
       <h4
         style={{ marginTop: "15px", marginBottom: "7px", fontWeight: "700",color: "#ccaa62" }}
       > 
         Add Movie Details 
       </h4>
      
       <div className="card text-center" style={{  marginTop: "40px",  width: '400px',
                height: '520px',
                margin: '15px 20px 20px 0px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#131418',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '5px',
                width:"330px" }}>
         <div className="card-body">
           <form >
             <div className="mb-3">
               <label className="form-label" style={{fontWeight:"800",fontSize:"10px"}}>Name</label>
               <input
                 type="text"
                 className="form-control"
                 onChange={(event) => setName(event.target.value)}
                 value={name}
                 placeholder="Movie Name"
                 style={{textAlign:"center",height:"27px",width:"100%",fontSize:"12px"}}
                 required
                 autoComplete="off"
               />
             </div>
             
             <div className="mb-3">
               <label className="form-label" style={{fontWeight:"800",fontSize:"12px"}}>Rating</label>
               <input
                 type="number"
                 className="form-control"
                 onChange={(event) => setStars(event.target.value)}
                 value={stars}
                 placeholder="Rating (Stars)"
                 style={{textAlign:"center",height:"27px",fontSize:"12px"}}
                 required
                 autoComplete="off"
               />
             </div>

             <div className="mb-3">
               <label className="form-label" style={{fontWeight:"800",fontSize:"12px"}}>Year Of Release</label>
               <input
                 type="number"
                 className="form-control"
                 onChange={(event) => setYear(event.target.value)}
                 value={year}
                 placeholder="Year Of Release"
                 style={{textAlign:"center",height:"27px",fontSize:"12px"}}
                 required
                 autoComplete="off"
               />
             </div>

             <div className="mb-3">
               <label className="form-label" style={{fontWeight:"800",fontSize:"12px"}}>Genre</label>
               <input
                 type="text"
                 className="form-control"
                 onChange={(event) => setGenre(event.target.value)}
                 value={Genre}
                 placeholder="-"
                 style={{textAlign:"center",height:"27px",fontSize:"12px"}}
                 required
                 autoComplete="off"
               />
             </div>

             <div className="mb-3">
               <label className="form-label" style={{fontWeight:"800",fontSize:"12px"}}>Description</label>
               <input
                 type="text"
                 className="form-control"
                 onChange={(event) => setDes(event.target.value)}
                 value={des}
                 placeholder="About Movie"
                 style={{textAlign:"center",height:"27px",fontSize:"12px"}}
                 required
                 autoComplete="off"
               />
             </div>

             <div className="mb-3">
               <label className="form-label" style={{fontWeight:"800",fontSize:"12px"}}>Cover Picture</label>
               <input
                 type="file"
                 className="form-control"
                 onChange={(event) => setPic(event.target.files[0])}
                 style={{textAlign:"center",height:"25px",fontSize:"12px"}}
                 required
                 autoComplete="off"
               />
             </div>

             <button type="submit" className="btn btn-primary" onClick={handleSubmit}style={{ backgroundColor: "#ccaa62", fontWeight: "900",fontSize:"12px",color: "white" }}>
               List Movie
             </button>
           </form>
         </div>
       </div>
     </center>
    </> )}
   </>
  );
}

export default Add;
