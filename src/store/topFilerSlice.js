import { createSlice } from "@reduxjs/toolkit";


let topfiltrSlice = createSlice({
    
    name:'topfilter',
    initialState:false  ,
    reducers:{

updatedfilter(initialval,paylod){
console.log(paylod)
    return paylod;
}
        
    }
    

})


export const {updatedfilter} = topfiltrSlice.actions;
export const useTopFilter = topfiltrSlice.reducer