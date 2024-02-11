import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : "user",
    initialState : {
        userIds : [{}]
    },
    reducers : {
        getUserId : (state , action) => {
            state.userIds.push({
                id: action.payload.uid
            })        }
    }
})
export const {getUserId} =  userSlice.actions
export default userSlice.reducer