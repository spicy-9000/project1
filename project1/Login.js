import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login(){
const [uname,setUname]=useState("");
const [semail,setEmail]=useState("");
const [phone, setPhone] = useState("");
const [gender,setGender]=useState("");  
const [password,setPassword]=useState("");  
  const navigate = useNavigate(); 
   const handleSubmit = async (event) => {
    event.preventDefault();
    const loginfo = { uname, semail, phone ,gender,password};
    try {
      const response = await fetch("http://localhost:4002/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginfo),
      });

      const msg = await response.text();
      alert(msg);
    } catch (err) {
      alert("Failed to send data: " + err.message);
    }
  };
return (
    <div className="login" style={styles.container}>
      <div className="sub-login">
        <form onSubmit={handleSubmit}    style={styles.form}>
          <div>
             <input type="text" name="uname" placeholder='enter your name..'value={uname} onChange={(e) => setUname(e.target.value)} required style={styles.input}/>
          </div>
          <div>
            <input type="email" name="email" placeholder="enter email.." value={semail} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          </div>
           {/* <div>
            Password <input type="text" name="uname" value={uname} onChange={(e) => setUname(e.target.value)} required />
          </div> */}
          <div>
           <input type="password" name="password" placeholder="password"value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input}/>
            {/* <link href='forgot password' style={{color:'red'}}></link> */}
          </div>

           <div style={{ marginTop: '10px' }}>
    <span
    onClick={() => navigate("/Forgot-password")}
    style={{ ...styles.a, cursor: "pointer", textDecoration: "underline" }}
  >
    Forgot Password
  </span>
</div>
           <div>
            GENDER:<br></br>
            <label>
           FEMALE <input type="radio"  name="t1" value='female' checked={gender==="female"}onChange={(e) => setGender(e.target.value)}/>
           <br></br>
             MALE <input type="radio"  name="t1" value='male' checked={gender==="male"}onChange={(e) => setGender(e.target.value)}/>
         </label> </div>
          <div>
            PHONE: <input type="phone" name="phone" placeholder="phone"value={phone} onChange={(e) => setPhone(e.target.value)} required style={styles.input}/>
          </div>
          <div style={{textAlign:'center',marginTop:'12px'}}>
          <button type="submit" style={{justifyContent:"center"}}>sign in</button>
        </div>
        </form>
      </div>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: "400px",
    margin: "30px auto",
    padding: "20px",
    top:"20px",
     border: "2px solid #666",
    borderRadius: "10px",
    background: "#f1f1f1",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
 input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  a:{
   color:"red",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #999"
  },
   button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#43b558",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
}
export default Login;