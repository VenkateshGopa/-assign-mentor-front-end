import {configureStore} from '@reduxjs/toolkit';
import mentor from './mentor';
import student from './students';

const store = configureStore({
    reducer:{
        mentors : mentor.reducer,
        students : student.reducer,
    }
})

export default store;