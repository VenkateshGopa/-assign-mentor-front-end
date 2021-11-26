import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import classes from './mentees.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Model from "./Model";

const Mentees = () => {
  const [id, setid] = useState({mentorid:'none'});
  const [mentees, setmentees] = useState([]);
  const [error , seterror] = useState("");
  const { mentors } = useSelector((state) => state.mentors);
  const [initial , setinitial] = useState(true);

  const changeHandler = ({target:{name, value}}) =>{
      setid({[name]:value});
  }
  
  const removeerror = () =>{
    seterror("");
  }

  const submithandler = async (event) => {
    event.preventDefault();
    console.log(id);
    if (id.mentorid !== "none")
    {
      try {
        const { data } = await axios.post("https://assignmentor1.herokuapp.com/mentes",id);
        setinitial(false)
        setmentees(data)
      } catch (error) {
        seterror(error.response.data.error);
      }
    }
    else{
        seterror("please select mentor")
    }
  };
  
  return (
    <>
    <div>
      <form onSubmit={submithandler} className={classes.div}>
      <label className={classes.label}>Mentor</label>
      <select className="form-select form-select-sm" name="mentorid" onChange={changeHandler} value={id.mentorid}>
        <option key="none" value="none">none</option>
        {mentors.map((ele) => (<option value={ele._id} key={ele._id}>{ele.name}</option>))}
      </select>
      <button className={classes.button}><i className="fa fa-search" aria-hidden="true"></i></button>
      </form>
      {console.log(initial)}
      {mentees.length !== 0  ? (<div className={classes.menteesdiv}>
      {mentees.map( ele => (<div key={ele._id} className={classes.mentees}>
        <p> Name: {ele.name}</p> 
        <p> Email: {ele.email}</p>
        </div>))}</div>) : <div className={initial ? `${classes.menteesdiv} ${classes.hide}` : classes.menteesdiv }> <p> No Mentees Found</p> </div>}
    </div>
    {error && <Model onclick={removeerror} message={error}/>}
    </>
  );
};
export default Mentees;
