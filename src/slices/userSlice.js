import { createSlice } from '@reduxjs/toolkit';
import user from 'libs/user';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userMenuPaths: user.getUserMenuPaths()
    },
    reducers: {
        setUserMenuPaths(state, { payload }) {
            user.setUserMenuPaths(payload)
            state.userMenuPaths = payload
        },
        clearUserMenuPaths(state) {
            user.removeUserMenuPaths()
            state.userMenuPaths = null
        }
    }
})
  
export const {
    setUserMenuPaths,
    clearUserMenuPaths
} = userSlice.actions;

export default userSlice.reducer;