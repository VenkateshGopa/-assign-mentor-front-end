import { useState } from "react";
import axios from "axios";
import classes from './addmentor.module.css';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Model from "./Model";

const Changementor = ()=>{
    
    const [student , setstudent] = useState({mentorid:"none" , studentid:"none"});
    const {mentors} = useSelector((state) => state.mentors);
    const {students} = useSelector((state) => state.students);
    const [error , seterror] = useState("");
    const history = useHistory();

const changeHandler = ({target:{name , value}}) =>{
    setstudent((prev) => ({...prev , [name]:value }))
}

const removeerror = () =>{
    seterror("");
}

const submithandler = async(event) =>{
    event.preventDefault();
    console.log(student);
    if(student.mentorid!=='none' && student.studentid!=='none')
    try{
    const {data}  = await axios.post("https://assignmentor1.herokuapp.com/changementor", student)
    console.log(data)
    history.push('/home');
    }
    catch(error){
        seterror(error.response.data.error);
    }
    else
    seterror("select mentor and student")
}

return (
<div className={classes.div}>
<p>Add Student</p>
<form onSubmit={submithandler} className={classes.form}>
  <div>
  <label className={classes.label}>Student <code>*</code></label>
  <select className={classes.select} name='studentid' onChange={changeHandler} value={student.studentid}>
      <option key='none' value="none"> none </option>
      {students.map( ele => <option value={ele._id} key={ele._id}>{ele.name}</option>)}
  </select>
  </div>

  <div>
  <label className={classes.label}>Mentor <code>*</code></label>
  <select className={classes.select} name='mentorid' onChange={changeHandler} value={student.mentorid}>
      <option key='none' value="none"> none </option>
      {mentors.map( ele => <option value={ele._id} key={ele._id}>{ele.name}</option>)}
  </select>
  </div>

  <button className={classes.button}> Change Mentor</button>
</form>
{error && <Model onclick={removeerror} message={error}/> }
</div>
);
};

export default Changementor;