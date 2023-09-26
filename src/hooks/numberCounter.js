
export const numberCounter = (val) => {
let numberString =  val.toString();
if(numberString.length >= 10){

  let returningValue  = (val / 1000000000).toString()
  
   if (returningValue.includes(".")) {
     // console.log(returningValue.split('.')[1].slice(0,2))
     return Number(returningValue.split(".")[1][0]) >= 1 && !Number(returningValue.split(".")[0].length <= 3 )
       ? (Number(returningValue.split(".")[0]) +
           Number("." + returningValue.split(".")[1][0])) + "B"
       : Number(returningValue.split(".")[0]) + "B";
   } else {
     return Number(returningValue) + "B";
   }
  
  
  
  }
else if(numberString.length >= 7){

let returningValue  = (val / 1000000).toString()

 if (returningValue.includes(".")) {
   // console.log(returningValue.split('.')[1].slice(0,2))
   return Number(returningValue.split(".")[1][0]) >= 1 && !Number(returningValue.split(".")[0].length <= 3 )
     ? (Number(returningValue.split(".")[0]) +
         Number("." + returningValue.split(".")[1][0])) + "M"
     : Number(returningValue.split(".")[0]) + "M";
 } else {
   return Number(returningValue) + "M";
 }



}
else if(numberString.length >= 4){

    
let returningValue  = (val / 1000).toString()

if (returningValue.includes(".")) {
  // console.log(returningValue.split('.')[1].slice(0,2))
  return Number(returningValue.split(".")[1][0]) >= 1 && !Number(returningValue.split(".")[0].length <= 3 )
    ? (Number(returningValue.split(".")[0]) +
        Number("." + returningValue.split(".")[1][0])) +"K"
    : Number(returningValue.split(".")[0]) +"K";
} else {
  return Number(returningValue) +"K";
}


}
else if(numberString.length <= 3){

  return val
}

}

