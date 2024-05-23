import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const localUser = localStorage.getItem("user");
const userSlice = createSlice({
  name : "user",
  initialState: {
    user: localUser ? JSON.parse(localUser) : null,
    loading:false
  },
  reducers : {
    setLoggedInUser : (state, action) => {
      state.user = action.payload
      toast.success("Login successfully")
    },
    logoutUser:(state)=>{
      state.user = {}
      localStorage.clear();
      toast.success('Logout successfully')
    }
  }
})

export const { setLoggedInUser,logoutUser } = userSlice.actions;

export default userSlice.reducer;

