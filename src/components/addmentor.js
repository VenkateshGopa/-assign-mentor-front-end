import { useState } from "react";
import axios from 'axios';
import classes from './addmentor.module.css';
import { useDispatch } from "react-redux";
import { mentoractions } from "../store/mentor";
import { useHistory } from "react-router-dom";
import Model from "./Model";
const Addmentor = () => {
    const [mentor , setmentor] = useState({});
    const [error , seterror] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const changeHandler = ({target:{name , value}}) =>{
        setmentor((prev) => ({...prev , [name]:value }))
    }

    const removeerror = () =>{
      seterror("");
    }

    const submithandler = async(event) =>{
        event.preventDefault();
        if(mentor.name && mentor.email)
        try{
        const {data}  = await axios.post("https://assignmentor1.herokuapp.com/addmentor" , mentor);
        await dispatch(mentoractions.Addmentor(data))
        console.log(data)
        history.push('/home');
        }
        catch(error){
            seterror(error.response.data.error)
        }
        else{
        seterror("Fill all the details");

        }
    }
  return (
    <div className={classes.div}>
    <p>Add Mentor</p>
    <form onSubmit={submithandler} className={classes.form}>
      <div>
      <label className={classes.label}>Name <code> * </code></label>
      <input className={classes.input} type='text' onChange={changeHandler} placeholder='Name' name='name'/>
      </div>
      <div>
      <label className={classes.label}>Email <code> * </code></label>
      <input className={classes.input} type='email' onChange={changeHandler} placeholder='Email' name='email'/>
      </div>
      <button className={classes.button}> + Add Mentor</button>
    </form>
    {error && <Model onclick={removeerror} message={error}/>}
    </div>
  );
};

export default Addmentor;
