import { createSlice } from "@reduxjs/toolkit";

const userInfoslice = createSlice({
    name:'userDTL',
    initialState : {
        userStatus:null,
        signinpopStatus:false,
        userFullDtl:null,
        youTubeUserName:'null'
        
    },

    reducers:{

    updateUserstatus(initialval,payload){
        return {...initialval,userStatus:payload.payload.userStatus}
    },

    updateSigninstatus(initialval,payload){
        return {...initialval,signinpopStatus:payload.payload.signInStatus}
    },

    updateuserFullDtl(initialval,payload){
        
        return {...initialval,userFullDtl:payload.payload.userFullDtl}
    },
    updateyouTubeUserName(initialval,payload){
        
        return {...initialval,youTubeUserName:payload.payload.youTubeUserName}
    }

    }
}) 
export let {updateSigninstatus,updateUserstatus,updateuserFullDtl,updateyouTubeUserName} = userInfoslice.actions;
export let userslice = userInfoslice.reducer