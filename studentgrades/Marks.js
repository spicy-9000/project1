import React from 'react'
import Title from './Title';
import Report from './Report';
import Details from './Details';
import Sign from './Sign';
const Markss=(props)=>{
     let x=parseInt(props.x);
     let y=parseInt(props.y);
     let z=parseInt(props.z);
     var total=x+y+z;
     var grade="";
 if (total > 90) {
    grade = "A";
  } else if (total > 85) {
    grade = "B";
  } else if (total > 60) {
    grade = "C";
  } else {
    grade = "FAIL";
  }
  return (
    <Student x={x} y={y} z={z} total={total} grade={grade} />
  );
}
class Student extends React.Component{
   render(){
    return(
        <div>
               <table border="1">
                <thead>
            <tr>
              <th colSpan={3}>
                <Title />
              </th>
            </tr>
            <tr>
              <th colSpan={3}>
                <Report />
              </th>
            </tr>
              <tr>
              <th colSpan={3}>
                <Details/>
              </th>
            </tr>
              <tr>
                <th>SNO</th>
                <th>SUBJECT NAME</th>
                <th>MARKS</th>
              </tr>
              </thead>
              <tr>
                <td>1</td>
                <td>C PROGRAMMING LANGUAGE</td>
                <td>{this.props.x}</td>
              </tr>
              <tr>
              <td>2</td>
                <td>PHYSICS</td>
                <td>{this.props.y}</td>
              </tr>
              <tr>
              <td>3</td>
                <td>CHEMISTRY</td>
                <td>{this.props.z}</td>
              </tr>
              <tr>
                <th>
                  GRADE: {this.props.grade}
                </th>
                <th colSpan={2}> TOTAL: {this.props.total}</th>
                </tr>
                <tr>
                  <th colspan={3}><Sign/></th>
                </tr>
               </table>
        </div>
      )
    }
}
function Marks() {
  return(
    <div className="App">
    <Markss x="30" y="30" z="40"/>
    </div>
  );
}

export default Marks;
