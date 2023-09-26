import { FieldValue, Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import { dataBase, db } from "../../../../services/firebase";
import { randomNumber } from "../../../../hooks/randomNumber";
import { useEffect } from "react";
import { updatesignInModelUnlogged } from "../../../../store/signInModelUnlogged";
import { Link } from "react-router-dom";


export const AddnewCommentfield = ({setComments,comments,commentID=false,setReply,newReplysList=false,newSetreplysList,setLoader,subreply=false}) => {
let {userStatus,userFullDtl,youTubeUserName} = useSelector(val=> val.userinfo)
let videoId = useSelector(val=> val.userCurrentWatch)
let dispatch = useDispatch();
console.log(youTubeUserName)

// console.log()
function addNewCommentvaluepdate(e){
let formActions = e.target.parentElement.querySelector('.addReply1');


    e.target.value.length > 0
  ? formActions.disabled = false
: formActions.disabled = true;

e.target.parentElement.querySelector(".addNewCommentActions").classList.remove("hidden");
}



function hideAddCommentField(e){

  e.target.parentElement.classList.add("hidden");
  e.target.parentElement.parentElement.querySelector(".commentInput").value = "";
}

  function submitMyCMNT(e) {
    e.preventDefault();
    let userComment = e.target.commentInput;


  
    // method to get user id from commentID
    // console.log((randomNumber() + userStatus).slice(8))


     if(userStatus){
      
      setLoader(true)
 
      let newCommentID = randomNumber() + userStatus;
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      var data = {
      comment : userComment.value,
      commentID : newCommentID,
      userID : userStatus,
      channelID : youTubeUserName,
      commentor : [userFullDtl.uid,userFullDtl.photoURL],
      totalReplys : [],
      time: dateTime,
      edited : " True ",
      likedList:[],
      subreply : subreply
            }


      if(userComment.value.length > 0){
        if(commentID){

          let mainCommentPath = db.collection('comments').doc(videoId).collection(commentID)
        mainCommentPath.doc(newCommentID).set({[newCommentID]:data}).then(function () {
          setDoc(doc(dataBase,'comments',videoId),{ [commentID]:{totalReplys:{[newCommentID]:newCommentID}}},{ merge: true }).then(function () {
            userComment.value = "";
            console.log()
            setReply(false)
            console.log(newReplysList)
            newSetreplysList([data,...newReplysList])
            setLoader(false)

          }).catch(function (error) {
            userComment.value = "";
            setReply(false)
        
          });
        })
        
        .catch(function (error) {
        
          userComment.value = "";
          setReply(false)
        
          console.error('Error adding document: ', error);
        });
        
        }else{
          setDoc(doc(dataBase,'comments',videoId),{ [newCommentID]:data},{ merge: true })
          .then(function () {
            userComment.value = "";
            e.target.querySelector('.addNewCommentActions').classList.add("hidden");

            setComments([data,...comments])
            setLoader(false)
           
          })
          .catch(function (error) {
            userComment.value = "";
            e.target.querySelector('.addNewCommentActions').classList.add("hidden");
        
          });
        }
        
      }
     }else{
      
      dispatch(updatesignInModelUnlogged({data:e.target.replyButton,heading:'Want to Add Comment?',subheading:'Sign in to make your opinion count.'}))
     }


  }





  return (
   <div className="flex mb-8 mt-5">
   <Link to={`/channel/${userStatus}`}> 
   <img
      className={`rounded-full mr-4 ${commentID ? 'w-[30px] h-[30px]': 'w-[40px] h-[40px]'}`}
      src={
        userFullDtl?.photoURL ||
        "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png"
      }
      alt=""
    /></Link>
    <form className="w-full" onSubmit={(e) => submitMyCMNT(e)}>
      <input
        type="text"
        name="commentInput"
        autoComplete="off"
        className="w-full border-gray-700 bg-transparent border-0 border-b-2 text-[14px] outline-none  placeholder:text-gray-400 commentInput"
        onChange={(e) => {addNewCommentvaluepdate(e)}}
        placeholder="add a reply..."
      />
      <div className="flex justify-end mt-3 items-center addNewCommentActions hidden">
        <p
          className="text-[14px] ml-auto cursor-pointer hideActions"
          onClick={(e) => hideAddCommentField(e)}
        >
          Cancel
        </p>
        <button
          type="submit"
          className="ml-3 disabled:bg-gray-500 bg-blue-400 text-black px-5 py-1.5 text-[15px] rounded-2xl addReply1" name="replyButton"
        >
          Reply
        </button>
      </div>
      
    </form>
  </div>
  )
}


