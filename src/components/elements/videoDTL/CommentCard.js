import { Link } from "react-router-dom"
import { useState } from "react"
import { numberCounter } from "../../../hooks/numberCounter";
import { serverTimestamp } from "firebase/firestore/lite";
import { CommentLikeAndDislike } from "./CommentLikeAndDislike";
import { AddnewCommentfield } from "./comment_component/AddnewCommentfield";
import { ReplyOnComment } from "./ReplyOnComment";



export const CommentCard = ({commentorData,userFullDtl,commentID}) => {
let [reply,setReply] = useState(false);
let commentreplys  = Object.keys(commentorData.totalReplys)
let [newReplysList,newSetreplysList] = useState([]) 
let [lodader,setLoader] = useState(false)


  return (
    <div className="mb-10">


      
      <div className="flex">
       <Link className="mr-4"> <img className="w-[40px] h-[40px] rounded-full" src={commentorData.commentor[1]} alt="" /> </Link>

<div>
<Link to={`/channel/${commentorData.channelID}`}><p className="text-[14px] font-medium">{commentorData.channelID} 

{/* <span className="text-[11px] text-gray-400 ml-1">{new Date(commentorData.time).getTime() - new Date().getTime()}</span> */}

</p></Link>
<p className="text-[15px] font-medium">{commentorData.comment}</p>
</div>

      </div>
<div className="actionSection ml-14 ">

  <div className="flex items-centerm items-center mt-4">
  
<CommentLikeAndDislike commentID={commentID} commentorData={commentorData} />

<p className="text-[12px] font-medium ml-5 mb-0 cursor-pointer" onClick={() => setReply(!reply) } >Reply</p>



  </div>


  {reply && <div>
    
    <img
          className={`w-[120px] block mx-auto ${lodader ? '' : 'hidden'}`}
          src={require("../../../images/Eclipse-1s-200px.gif")}
          alt=""
        /> 
<div className={lodader ? 'hidden' : '' }>
<AddnewCommentfield  commentID={commentID} setReply={setReply} newReplysList={newReplysList} newSetreplysList={newSetreplysList} lodader={lodader} setLoader={setLoader} /></div></div>}

{
 
(commentreplys.length >  0 || newReplysList.length >  0) && <ReplyOnComment commentreplys={commentreplys} commentID={commentID} newReplysList={newReplysList} newSetreplysList={newSetreplysList} />

}
</div>

    </div>
  )
}


