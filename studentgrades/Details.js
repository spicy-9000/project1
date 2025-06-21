import React from 'react'

const Titled=(props)=>{
   return(
    <div>
       <h4>STUDENT NAME: <u>{props.sname}</u> &nbsp;&nbsp;STUDENT ROLLNO: <u>{props.sroll}</u></h4>
    </div>
   )
}
function Details() {
  return(
    <div className="App">
    <Titled sname="RAD" sroll="46"/>
    </div>
  );
}

export default Details;
