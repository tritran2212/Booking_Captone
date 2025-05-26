import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "../store/user.slice";

export const store = configureStore({

    reducer:{

        text(state = {c:"Trần Văn Trí Đây"}){
            return state
        }
        // userReducer ,

    },
})