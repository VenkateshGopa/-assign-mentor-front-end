import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from './Unassignedstudents.module.css';
const Unassignedstudents = () => {
  const [unassignedstudents, setunassignedstudents] = useState([]);
  let id= 1;
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get("https://assignmentor1.herokuapp.com/unassignedstudents");
        setunassignedstudents(data);
      } catch {
        console.log("failed to fetch data");
      }
    };
    fetchdata();
  }, []);
  console.log(unassignedstudents);
  return (
    <>
    {unassignedstudents.length !== 0 ? (
    <table className="table table-hover mt-3">
      <thead className="bg-black text-white">
        <tr>
          <th className={classes.heading} scope="col">#</th>
          <th className={classes.heading} scope="col">Name</th>
          <th className={classes.heading} scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {unassignedstudents.map(ele => 
        <tr key={ele._id}>
          <th className={classes.text} scope="row">{id++}</th>
          <td className={classes.text}>{ele.name}</td>
          <td className={classes.text}>{ele.email}</td>
        </tr>)}
      </tbody>
    </table>) : <p className={classes.message}>No data found...</p>}
    </>
  );
};

export default Unassignedstudents;
