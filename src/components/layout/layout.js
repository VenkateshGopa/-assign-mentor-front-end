import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './layout.module.css';

const Layout = (props) =>{
    const [nav , setnav]= useState(false);
    const shownav = () =>{
        setnav((prev) => (!prev));
    }

    return(
        <>
        <div className={classes.nav}><button onClick = {shownav}> ||| </button>
            <p> Assign-Mentor</p>
            <div className={classes.navitems}>
            <NavLink to="/home" activeClassName={classes.active}>Home</NavLink>
            <NavLink to="/addstudent" activeClassName={classes.active}>Add Student</NavLink>
            <NavLink to="/addmentor" activeClassName={classes.active}>Add Mentor</NavLink>
            <NavLink to="/unassignedstudents" activeClassName={classes.active}>Unassigned Students</NavLink>
            <NavLink to="/assignMentors" activeClassName={classes.active}>Assign Students</NavLink>
            <NavLink to="/mentees" activeClassName={classes.active}>Mentees</NavLink>
            <NavLink to="changementor" activeClassName={classes.active}>Change Mentor</NavLink>
            </div>
        </div>
        <div className={nav ? `${classes.left} ${classes.lefth}` : classes.left }><ul>
            <li onClick={shownav} className={classes.closebtn}><i className="fas fa-times"></i></li>
            <li><NavLink to="/home" activeClassName={classes.active}>Home</NavLink></li>
            <li><NavLink to="/addstudent" activeClassName={classes.active}>Add Student</NavLink></li>
            <li><NavLink to="/addmentor" activeClassName={classes.active}>Add Mentor</NavLink></li>
            <li><NavLink to="/unassignedstudents" activeClassName={classes.active}>Unassigned Students</NavLink></li>
            <li><NavLink to="/assignMentors" activeClassName={classes.active}>Assign Students</NavLink></li>
            <li><NavLink to="/mentees" activeClassName={classes.active}>Mentees</NavLink></li>
            <li><NavLink to="changementor" activeClassName={classes.active}>Change Mentor</NavLink></li>
            </ul>
        </div>
        {/* nav ? `${classes.right} ${classes.righth}` : */}
        <div className={classes.right}>
            {props.children}
        </div>
        </>
    );
}

export default Layout;