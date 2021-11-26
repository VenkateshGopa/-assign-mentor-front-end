import "./App.css";
import { Switch, Route , Redirect} from "react-router-dom";
import Addmentor from "./components/addmentor";
import Addstudent from "./components/addstudent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getmentordata, getStudentdata } from "./store/mentor-student";
import Layout from "./components/layout/layout";
import Mentees from "./components/mentees";
import AssignMentors from "./components/AssignMentors";
import Unassignedstudents from "./components/Unassignedstudents";
import Changementor from "./components/changementor";
import Home from "./components/Home";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentdata());
    dispatch(getmentordata());
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home'/>
        </Route>
        <Route path="/home" exact>
          <Home/>
        </Route>
        <Route path="/addstudent">
          <Addstudent />
        </Route>
        <Route path="/addmentor">
          <Addmentor />
        </Route>
        <Route path="/mentees">
          <Mentees />
        </Route>
        <Route path="/assignMentors">
          <AssignMentors />
        </Route>
        <Route path='/unassignedstudents'>
          <Unassignedstudents/>
        </Route>
        <Route path='/changementor'>
          <Changementor/>
        </Route>
        <Route path='*'>
          <Redirect to='/home'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
