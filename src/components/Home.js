import { useSelector } from "react-redux";
import classes from "./Home.module.css";
import {Link} from 'react-router-dom'
const Home = () => {
  
  const {mentors} = useSelector(state => state.mentors)
  const {students} = useSelector(state => state.students)

  return (
    <div className={classes.home}>
      <p className={classes.heading}>Share your expertise, grow,</p>
      <p className={classes.headingblue}>make a difference</p>
      <p className={classes.para}>
        Mentoring is a two-way street. Let us take care of the boring parts so
        you can concentrate on personal and professional growth for both you and
        your mentees.
      </p>
      <i>A Total <code>{mentors.length}</code> Mentors helping out <code>{students.length}</code> Students</i>
      <div className={classes.buttonsdiv}>
        <Link className={classes.button} to='/addstudent'>Add Student</Link>
        <Link className={classes.button} to='/addmentor'>Add Mentor</Link>
      </div>
    </div>
  );
};
export default Home;
