import { useEffect, useId, useState } from "react";
import { CommentCard } from "./CommentCard";
import { VideoComments } from "../../../services/rapidapi";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore/lite";
import { dataBase } from "../../../services/firebase";
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/firestore/lite";
import "firebase/compat/firestore";
import { AddnewCommentfield } from "./comment_component/AddnewCommentfield";
import { useSelector } from "react-redux";

export const CommentSEC = ({  userStatus, userFullDtl,setunloggedpopup}) => {
  let videoId = useSelector(val=> val.userCurrentWatch) || 'videoid';

  let [comments, setComments] = useState([]);
  let [lodader,setLoader] = useState(false)

// API COMMENTS 🛑🛑🛑🛑
  // useEffect(() => {
  //   VideoComments(videoId)
  //     .then((val) => {
  //       setComments(val);
  //       console.log(val);
  //     })
  //     .catch((error) => error);
  // }, [videoId]);
  // API COMMENTS 🛑🛑🛑🛑


useEffect(()=>{


async function updateCommentData() { 
       
  const docRef = doc(dataBase, "comments", videoId);
const docSnap = await getDoc(docRef)

if(docSnap.exists() && docSnap.data()){
  let commentsDataKey = Object.keys(docSnap.data());
let commentsDataentries = Object.values(docSnap.data());
// let commentData = commentsDataKey.map((val ,index) => { return {[val] : commentsDataentries[index]}});
setComments(commentsDataentries)
}else{
  setComments([])

}




// setComments([...docSnap.data()])

}
updateCommentData()
},[videoId, userStatus])





  function randomNumber() {
    let random = Math.floor(Math.random() * 99999789);
    return random;
  }

  function submitMyCMNT(e) {
    e.preventDefault();
    let userComment = e.target.commentInput;

    console.log(userFullDtl);
    // method to get user id from commentID
    // console.log((randomNumber() + userStatus).slice(8))

 
let commentID = randomNumber() + userStatus;
var data = {
comment : userComment.value,
commentID : commentID,
userID : userStatus,
channelID : " @commenterChannelID ",
commentor : [userFullDtl.uid,userFullDtl.photoURL],
totalReplys : " 0 ",
time: serverTimestamp(),
edited : " True "
      }
// setDoc(doc(dataBase,'comments',videoId),{ '312598212l3miLcOYZPe3n7s4ociebbUrzz2':{edited:{[randomNumber()]:'ashu123'}}},{ merge: true })

 setDoc(doc(dataBase,'comments',videoId),{ [commentID]:data},{ merge: true })
      .then(function () {
        alert("Document Added ");
        userComment.value = "";
        setComments([data,...comments])
       
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        userComment.value = "";
      });
  }

  return (
    <div className="comments">
      <p className="text-md text-white py-5 px-1">{9090} Comments</p>


    {lodader ? 
    
    <img
          className="w-[120px] block mx-auto"
          src={require("../../../images/Eclipse-1s-200px.gif")}
          alt=""
        /> : 
    
    <AddnewCommentfield setComments={setComments} videoId={videoId} comments={comments} lodader={lodader} setLoader={setLoader}/>}

      {comments.length > 0 ? (
        comments.map((val) => (
          <CommentCard commentorData={val} commentID={val.commentID} key={val.commentID} userFullDtl={userFullDtl} />
        ))
      ) : (
        <h5 className=" text-center mb-5">No Comments</h5>
      )}
    </div>
  );
};
