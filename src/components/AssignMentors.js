import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './addmentor.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStudentdata } from '../store/mentor-student';
import { useHistory } from 'react-router-dom';
import Model from './Model';

const AssignMentors = () =>{

const [mentor , setmentor] = useState({mentorid:"none"});
const [selected, setselected] = useState([]);
const [students , setstudents] = useState([]);
const history = useHistory();
const {mentors} = useSelector((state) => state.mentors);
const [error , seterror] = useState("");
const dispatch = useDispatch();

useEffect(() =>{
    const fetchdata = async () => {
        try{
            const {data} = await axios.get("https://assignmentor1.herokuapp.com/unassignedstudents");
            setstudents(data);
        }
        catch{
            console.log("failed to fetch data");
        }
    };
    fetchdata();
},[])

const removeerror = () =>{
    seterror("");
}

const changeHandlerc = ({target:{ value , checked}}) =>{
    if(!checked){
      setselected((prev) =>( prev.filter(ele =>(ele!==value))))
    }
    if(checked){
      setselected((prev) => ([...prev ,value ]))
    }
}
    
const changeHandler = ({target:{name , value}}) =>{
    setmentor((prev) => ({...prev , [name]:value }))
    console.log(name , value)
}

const submitHandler = async(event) =>{
    event.preventDefault();
    if(mentor.mentorid!=='none' && selected.length > 0)
    try{
    const {data}  = await axios.post("https://assignmentor1.herokuapp.com/assignmentor" , {...mentor , students:selected});
    await dispatch(getStudentdata());
    console.log(data)
    history.push('/home');
    }
    catch(error){
        seterror(error.response.data.error);
    }
    else{
        seterror("Select mentor and select atlest one student");
    }
    console.log({...mentor , studentid:selected})
}
return(
    <div className={classes.div}>
        <p>Assign Mentor to Students</p>
        <i> you can assign single or multiple students </i>
        <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes["heading-unassigned"]}>

            <label className={classes.label}>Mentor <code> * </code></label>
            <select className="form-select form-select-sm" name='mentorid' onChange={changeHandler} value={mentor.mentorid}>
                <option key='none' value="none"> none </option>
                {mentors.map( ele => <option value={ele._id} key={ele._id}>{ele.name}</option>)}
            </select>

            <p> Un-assigned students List <code> * </code></p>
            { students.length!==0 ? (students.map((ele, index) =>
            <div key={index}>
            <input className={classes.checkbox} type='checkbox' key={ele._id} value={ele._id} onChange={changeHandlerc} name="studentid" ></input> 
            <label className={classes.value} key={index}>{ele.name}</label>
            </div>)) : <p>All students are already assigned to mentors</p>}

        </div>
        <button className={classes.button}>Assign</button>
        </form>
        {error && <Model onclick={removeerror} message={error}/> }
    </div>
);
}

export default AssignMentors;