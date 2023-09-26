import { useEffect, useState } from "react";
import { db } from "../../../services/firebase";
import { useSelector } from "react-redux";
import { CommentReplyCards } from "./CommentReplyCards";
import { downIcon, upIcon } from "../../../icons/svg";

export const ReplyOnComment = ({commentreplys,commentID,newReplysList,newSetreplysList}) => {
  let videoId = useSelector(val=> val.userCurrentWatch);
  let [replysList,setreplysList] = useState([]) 
  let [toggleReply,setToggleReply] = useState(false);




function hideShowreplys(){


  if(replysList.length === 0){
    let emptyArray = []
 // Create a reference to the parent document
 const parentDocRef = db.collection('comments').doc(videoId);
  
 // Create a reference to the subcollection
 const subcollectionRef = parentDocRef.collection(commentID);
 
 // Retrieve all documents from the subcollection
 subcollectionRef.get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
    emptyArray.push(doc.data())
    setreplysList(emptyArray)
    //  console.log(doc.data());
    setToggleReply(true)
   });
 }).catch((error) => {
   console.error('Error getting documents: ', error);
 });
  }else{
    setToggleReply(!toggleReply)
  }
}


  return (
  <div className="mt-3">
 <p onClick={()=>hideShowreplys()} className="px-4 pt-1 pb-1.5 text-[12px] rounded-full cursor-pointer text-[#3ea6ff] hover:bg-[#263850] max-w-max flex items-center"> <span dangerouslySetInnerHTML={{__html:toggleReply ? upIcon : downIcon}} className="mr-2 "></span> {commentreplys.length + newReplysList.length} Replies</p>
<div className="mt-5"> 
  
{
   toggleReply && replysList?.map((val,index) => (
     <CommentReplyCards replydata={val} key={index} commentID={commentID} newReplysList={newReplysList} newSetreplysList={newSetreplysList} />
     
    ))
  }

  {
    newReplysList.length > 0 && newReplysList.map((val,index) => (
      <CommentReplyCards replydata={{[val.commentID]:val}} key={index} commentID={commentID} newReplysList={newReplysList} newSetreplysList={newSetreplysList} />
      // console.log(val)
     ))
  }
    


</div>

   
  </div>
  )
}

