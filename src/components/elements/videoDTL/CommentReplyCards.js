import { useState } from "react";
import { AddnewCommentfield } from "./comment_component/AddnewCommentfield"
import { Link } from "react-router-dom";
import { CommentLikeAndDislike } from "./CommentLikeAndDislike";

export const CommentReplyCards = ({replydata,newReplysList,newSetreplysList,commentID}) => {
  let [reply,setReply] = useState(false);
let replyCommentID = replydata[Object.keys(replydata).join('')]?.commentID;
let commentorData = replydata[Object.keys(replydata).join('')];
let [lodader,setLoader] = useState(false)

  return (




<div className="mb-10">


      
<div className="flex">
 <Link className="mr-4"> <img className="w-[30px] h-[30px] rounded-full" src={commentorData?.commentor[1]} alt="" /> </Link>


<div>
<Link><p className="text-[14px] font-medium">{commentorData.channelID} 

{/* <span className="text-[11px] text-gray-400 ml-1">{new Date(commentorData.time).getTime() - new Date().getTime()}</span> */}

</p></Link>
<p className="text-[14px] font-medium">{commentorData?.subreply && <Link className="text-[#3ea6ff]" to={`/channel/${commentorData?.subreply}`}>{commentorData?.subreply}</Link> } {commentorData?.comment}</p>
</div>

</div>
<div className="actionSection ml-14 ">

<div className="flex items-centerm items-center mt-4">

<CommentLikeAndDislike commentID={commentID} replyCommentID={replyCommentID} commentorData={commentorData} />

<p className="text-[12px] font-medium ml-5 mb-0 cursor-pointer" onClick={() => setReply(!reply) } >Reply</p>
{/* <p className="text-[12px] font-medium ml-5 mb-0 cursor-pointer" onClick={()=> console.log(commentorData) } >Reply</p> */}



</div>


{reply && <div>
    
    <img
          className={`w-[120px] block mx-auto ${lodader ? '' : 'hidden'}`}
          src={require("../../../images/Eclipse-1s-200px.gif")}
          alt=""
        /> 
<div className={lodader ? 'hidden' : '' }>
<AddnewCommentfield commentID={commentID} lodader={lodader} setReply={setReply} setLoader={setLoader} subreply={commentorData.channelID} newReplysList={newReplysList} newSetreplysList={newSetreplysList} />
</div>
</div>
}

{



}
</div>

</div>






    // <div>
    //   {console.log(replydata[Object.keys(replydata).join('')].comment)}
    //   {/* {console.log(Object.keys(replydata).join(''))} */}
    //    {/* {console.log([...Object.keys(replydata)].comment)} */}
    // </div>
  )
}

