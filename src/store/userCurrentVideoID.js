import { createSlice } from "@reduxjs/toolkit";


let currentVideo = createSlice({
    
    name:'currentVideo',
    initialState:false,
    reducers:{

updateVideoId(initialval,recievedData){
    return recievedData.payload;
}
        
    }
    

})


export const {updateVideoId} = currentVideo.actions;
export const userCurrentWatch = currentVideo.reducer