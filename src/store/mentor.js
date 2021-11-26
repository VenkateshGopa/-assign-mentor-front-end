import {createSlice} from '@reduxjs/toolkit';

const mentor = createSlice({
    name:"mentor",
    initialState: {
        mentors:[]
    },
    reducers: {
        mentors(state, actions){
            state.mentors= actions.payload.mentors
        },
        Addmentor(state , actions){
            state.mentors = ([...state.mentors , actions.payload])
        }
    }
})

export const mentoractions = mentor.actions;
export default mentor;