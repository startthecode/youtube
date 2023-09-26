import { configureStore } from "@reduxjs/toolkit";
import { useTopFilter } from "./topFilerSlice";
import { userslice } from "./userInfo";
import { signInModelForUnloggedSlice } from "./signInModelUnlogged";
import { userCurrentWatch } from "./userCurrentVideoID";

export const store = configureStore({
    reducer:{
        topFilter:useTopFilter,
        userinfo: userslice,
        signInModelForUnlogged: signInModelForUnloggedSlice,
        userCurrentWatch:userCurrentWatch
    }
})