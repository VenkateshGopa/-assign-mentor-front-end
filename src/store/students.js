import {createSlice} from '@reduxjs/toolkit';

const student = createSlice({
    name:"student",
    initialState: {
        students:[]
    },
    reducers: {
        students(state, actions){
            state.students= actions.payload.students
        },
        Addstudent(state , actions){
            state.students = ([...state.students , actions.payload])
        }
    }
})

export const studentactions = student.actions;
export default student;