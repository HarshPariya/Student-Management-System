import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  students: [
    { id: 1, name: "Harsh Pariya", course: "MERN", age: '19', Batch: "September" },
  ],
};

const studentSlice = createSlice({
  name: 'Students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const { name, course, age, Batch } = action.payload;
      const objstudent = {
        id: nanoid(),
        name,
        course,
        age,
        Batch,
      };
      state.students.push(objstudent);
    },

    editStudent: (state, action) => {
      const { id, name, course, age, Batch } = action.payload;
      const studentIndex = state.students.findIndex((student) => student.id === id);

      if (studentIndex !== -1) {
        state.students[studentIndex] = {
          id, 
          name,
          course,
          age,
          Batch,
        };
      }
    },

    deleteStudent: (state, action) => {
      const id = action.payload;
      state.students = state.students.filter((student) => student.id !== id);
    },
  },
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
