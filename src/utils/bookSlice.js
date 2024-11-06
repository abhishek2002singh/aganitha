import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: [],
  reducers: {
    setBooks: (state, action) => action.payload,
    addBook: (state, action) => {
      state.push(action.payload);
    },
    removeBook: (state, action) => {
      return state.filter(book => book._id !== action.payload);
    },
  },
});

export const { setBooks, addBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
