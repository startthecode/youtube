import { createSlice } from "@reduxjs/toolkit";

let signInModelUnlogged = createSlice({
name:'signInModelUnlogged',
initialState:{
    data:false,
    heading:'dummy heading',
    subheading:'this is sub heading'
},
reducers:{

    updatesignInModelUnlogged(currentState,recivedData){
return {data:recivedData.payload.data,heading:recivedData.payload.heading,subheading:recivedData.payload.subheading,}
    },

    resetSignInModelUnlogged(){
        return { data:false,
            heading:'dummy heading',
            subheading:'this is sub heading'}
            }

}
}
)


export let {updatesignInModelUnlogged,resetSignInModelUnlogged} = signInModelUnlogged.actions;
export let signInModelForUnloggedSlice = signInModelUnlogged.reducer;