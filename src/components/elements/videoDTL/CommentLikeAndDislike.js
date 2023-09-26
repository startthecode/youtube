
import { numberCounter } from "../../../hooks/numberCounter";
import { useEffect, useReducer } from 'react';
import { deleteField, doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { dataBase, db } from '../../../services/firebase';
import { updatesignInModelUnlogged } from '../../../store/signInModelUnlogged';
import { useDispatch, useSelector } from 'react-redux';
import { randomNumber } from '../../../hooks/randomNumber';

export const CommentLikeAndDislike = ({commentID,commentorData,replyCommentID=false}) => {
  let {userStatus,userFullDtl} = useSelector(val=> val.userinfo)
  let signInModelForUnlogged = useSelector(val=> val.signInModelForUnlogged)
  let videoId = useSelector(val=> val.userCurrentWatch)

  let dispatch = useDispatch();

    let [likeDislike,setLikeDislike] = useReducer((currentState,action) => {
switch(action.type){

    case "likedthisComment" : return {...currentState,likeComments:action.updatevalue}
    case "disLikedComments": return {...currentState,disLikedComments:action.updatevalue};
    case "userCurrentActionLIke": return {...currentState,userCurrentActionLIke:action.updatevalue};
    case "updatelikedList": return {...currentState,likedList:action.updatevalue};
    case "reset": return {  
      likeComments:false,
      likedList:{}, 
      disLikedComments:false,
      userCurrentActionLIke:null
    
    
      };


    default:
      return currentState;

}

    }
    ,{

        likeComments:commentorData.likedList?.[userStatus] === 'liked' ? true : false,
        likedList:Object.values(commentorData.likedList).filter(val => val === "liked").length, 
        disLikedComments:commentorData.likedList?.[userStatus] === 'disliked' ? true : false, 
        userCurrentActionLIke:commentorData.likedList?.[userStatus]
    }
    )


    function likeMe(e) { 
        let dataAction = e.target.closest('div').getAttribute('data-action')
        let userAction = dataAction === 'likeMe' ? 'liked' : 'disliked';
     
        let uploadLikedData = (likeDislike.likeComments && dataAction === 'likeMe') || (likeDislike.disLikedComments && dataAction === 'disLikeMe') ? false : userAction;
        let updateLikedlist = (likeDislike.likeComments && userAction === 'liked') || (likeDislike.likeComments && userAction === 'disliked') ? likeDislike.likedList - 1 : userAction === "liked" ? likeDislike.likedList + 1 : likeDislike.likedList 



          if(userStatus){
            e.target.closest("div").style="pointer-events:none";
   

if(!replyCommentID){
  setDoc(doc(dataBase,'comments',videoId),{ [commentID]:{likedList:{[userStatus]:uploadLikedData}}},{ merge: true }).then(()=> {

    setLikeDislike({type:'likedthisComment',updatevalue:uploadLikedData === 'liked' ? true : false});
    
setLikeDislike({type:'disLikedComments',updatevalue:uploadLikedData === 'disliked' ? true : false});
setLikeDislike({type:'userCurrentActionLIke',updatevalue:uploadLikedData});
setLikeDislike({type:'updatelikedList',updatevalue:updateLikedlist});

e.target.closest("div").style="pointer-events:auto"
      
      })
          .catch(error => alert(error.message))
}
else{

 let parentRef =  db.collection('comments').doc(videoId);
 let mainRef =  parentRef.collection(commentID).doc(replyCommentID);

 mainRef.set({ [replyCommentID]:{likedList:{[userStatus]:uploadLikedData}}},{ merge: true })

 .then(() => {
  setLikeDislike({type:'likedthisComment',updatevalue:uploadLikedData === 'liked' ? true : false});
    
  setLikeDislike({type:'disLikedComments',updatevalue:uploadLikedData === 'disliked' ? true : false});
  setLikeDislike({type:'userCurrentActionLIke',updatevalue:uploadLikedData});
  setLikeDislike({type:'updatelikedList',updatevalue:updateLikedlist});
  
  e.target.closest("div").style="pointer-events:auto"
 })
 .catch((error) => {
   console.error('Error updating document: ', error);
 });
}

            
          }else{
            if(userAction == 'liked'){
              dispatch(updatesignInModelUnlogged({data:e.currentTarget,heading:'Like this c?',subheading:'Sign in to make your opinion count.'}))
              // setunloggedpopup({data:e.currentTarget,heading:'Like this video?',subheading:'Sign in to make your opinion count.'})
            }else{
              dispatch(updatesignInModelUnlogged({data:e.currentTarget,heading:'Unlike this video?',subheading:'Sign in to make your opinion count.'}))
              // setunloggedpopup({data:e.currentTarget,heading:'Unlike this video?',subheading:'Sign in to make your opinion count.'})
            }
  
           
          }
         
          
      
      
         }

 
  return (
    <div className="LikeDislikeComments flex items-center">
    <div className="flex items-center mr-2 " data-action="likeMe" >
    <i data-action="likeMe" className={likeDislike.likeComments ? `fa-solid fa-thumbs-up mr-0` : 'fa-regular mr-0 fa-thumbs-up'} onClick={ (e) => likeMe(e)}></i> 
      <span className="text-[13px] ml-1.5" data-action="likeMe">
        {
        numberCounter(likeDislike.likedList)
        }
        </span>
     </div>
     
  <div className='ml-3'>
  <i data-action="disLikeMe" className={likeDislike.disLikedComments ? `fa-thumbs-down mr-2 fa-solid` : 'fa-regular mr-2 fa-thumbs-down'} onClick={ (e) => likeMe(e)}></i>
  </div>
    </div>
  )
}

