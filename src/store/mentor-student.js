import axios from "axios";
import { mentoractions } from "./mentor";
import { studentactions } from "./students";


export const getStudentdata = () => {

  return async (dispatch) => {
    const fetchdata = async () => {
        try{
            const {data} = await axios.get("https://assignmentor1.herokuapp.com/students");
            dispatch(studentactions.students({students: data || []}));
        }
        catch{
            console.log("failed to fetch data");
        }
    };
    fetchdata();
  };
};

export const getmentordata = () => {

    return async (dispatch) => {
      const fetchdata = async () => {
          try{
              const {data} = await axios.get("https://assignmentor1.herokuapp.com/mentors");
              dispatch(mentoractions.mentors({mentors: data || []}));
          }
          catch{
              console.log("failed to fetch data");
          }
      };
      fetchdata();
    };
  };