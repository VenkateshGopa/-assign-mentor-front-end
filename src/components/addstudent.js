import { useState } from "react";
import axios from "axios";
import classes from './addmentor.module.css';
import { useDispatch, useSelector } from "react-redux";
import { studentactions } from "../store/students";
import { useHistory } from "react-router-dom";
import Model from "./Model";

const Addstudent = ()=>{
    
const [student , setstudent] = useState({mentorid:"none"});
const {mentors} = useSelector((state) => state.mentors);
const [error , seterror] = useState("");
const history = useHistory();
const dispatch = useDispatch();

const changeHandler = ({target:{name , value}}) =>{
    setstudent((prev) => ({...prev , [name]:value }))
}

const removeerror = () =>{
    seterror("");
}
const submithandler = async(event) =>{
    event.preventDefault();
    if(student.name && student.email)
    try{
    const {data}  = await axios.post("https://assignmentor1.herokuapp.com/addstudent", 
    student.mentorid!=="none" ? student :{name:student.name , email:student.email})
    await dispatch(studentactions.Addstudent(data));
    console.log(data)
    history.push('home');
    }
    catch(error){
        seterror(error.response.data.error);
    }
    else{
        seterror("Fill all the details");
    }
}

return (
<div className={classes.div}>
<p>Add Student</p>
<form onSubmit={submithandler} className={classes.form}>
  <div>
  <label className={classes.label}>Name <code>*</code></label>
  <input className={classes.input} type='text' onChange={changeHandler} placeholder='Name' name='name'/>
  </div>
  <div>
  <label className={classes.label}>Email <code>*</code> </label>
  <input className={classes.input} type='email' onChange={changeHandler} placeholder='Email' name='email'/>
  </div>
  <div>
  <label className={classes.label}>Mentorid</label>
  <select className={classes.select} name='mentorid' onChange={changeHandler} value={student.mentorid}>
      <option key='none' value="none"> none </option>
      {mentors.map( ele => <option value={ele._id} key={ele._id}>{ele.name}</option>)}
  </select>
  </div>
  <button className={classes.button}> + Add student</button>
</form>
{error && <Model onclick={removeerror} message={error}/> }
</div>
);
};

export default Addstudent;