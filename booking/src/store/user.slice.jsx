import {createSlice } from '@reduxjs/toolkit';
import { managerStorage } from '../common/utils/localstorage';
import {KEY_ACCESS_TOKEN} from "../common/constants/index";


const useSlice = createSlice({
    name :"userSlice",
    initialState:{
        user:null,
    },
    reducers:{

        setUser(state,action){
            state.user = action.payload;
        },
        clearUser(state){
            state.user = null;
        },
        logout(state){
            state.user = null,
            managerStorage.remove(KEY_ACCESS_TOKEN);
        }


    }
})

export  const userReducer  = useSlice.reducer;

export const {setUser,logout} = useSlice.actions;