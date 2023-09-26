import {  deleteField, doc, getDoc,  setDoc, updateDoc } from 'firebase/firestore/lite';
import { dataBase } from '../../../services/firebase'
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatesignInModelUnlogged } from '../../../store/signInModelUnlogged';


export const LikeUnlike = ({userStatus,videoId}) => {
  let dispatch = useDispatch();
  let signInModelForUnlogged = useSelector(val=> val.signInModelForUnlogged)

    let [videoData,updataVideoData] = useReducer(
        (state, action) => {
           switch (action.type) {
             case "LikedVideo": return {...state,LikedVideo:action.updatevalue};
             case "updatelikedList": return {...state,likedList:action.updatevalue};
             case "dislikevideo": return {...state,dislikevideo:action.updatevalue};
           
             case "userCurrentActionLIke": return {...state,userCurrentActionLIke:action.updatevalue};
       
             case "reset": return {  
               LikedVideo:false,
               likedList:{}, 
               dislikevideo:false,
               userCurrentActionLIke:null
             
             
             
               };
           
       
       
             default:
               return state;
           }
         },
         {  
         LikedVideo:false,
         likedList:{}, 
         dislikevideo:false,
         userCurrentActionLIke:null
       
       
       
         }
       
       )
       



       
       
       
       
       useEffect(()=>{
         updataVideoData({type:'reset',updatevalue:'docSnap.data()'})
         },[videoId]);
       
       
         useEffect(()=>{
           async function updatelikedList() { 
       
                 const docRef = doc(dataBase, "likeVideoList", videoId);
             const docSnap = await getDoc(docRef)
          
       if(docSnap.exists() && docSnap.data()){
       
         updataVideoData({type:'updatelikedList',updatevalue:docSnap.data()})
       
           if(docSnap.data().hasOwnProperty(userStatus)){
            
             if(docSnap.data()[userStatus].action == 'disliked'){
               
             updataVideoData({type:'dislikevideo',updatevalue:true})  
       
               updataVideoData({type:'LikedVideo',updatevalue:false})  
               updataVideoData({type:'userCurrentActionLIke',updatevalue:'disliked'})
             }else{
               updataVideoData({type:'LikedVideo',updatevalue:true})  
               updataVideoData({type:'dislikevideo',updatevalue:false})
               updataVideoData({type:'userCurrentActionLIke',updatevalue:'liked'})
       
             }
             // docSnap.data()[userStatus].action == 'dislike' ?  updataVideoData({type:'dislikevideo',updatevalue:true}) :  updataVideoData({type:'LikedVideo',updatevalue:true})
           }else{
             updataVideoData({type:'LikedVideo',updatevalue:false})
             updataVideoData({type:'dislikevideo',updatevalue:false})
       
           }
           
         }
       
           }
       
       
           updatelikedList();
          
            
       
         },[videoData.LikedVideo,userStatus,videoId])
       
       
       






    function likeMe(e) { 
      let dataAction = e.target.getAttribute('data-action')
      let userAction = dataAction == 'likeMe' ? 'liked' : 'disliked';
        if(userStatus){
          e.target.closest("div").style="pointer-events:none";
         
          
          if((videoData.LikedVideo && dataAction === 'likeMe') || (videoData.dislikevideo && dataAction === 'disLikeMe')){
           
          updateDoc(doc(dataBase, "likeVideoList", videoId),{[userStatus]:deleteField()}).then(()=> {
            updataVideoData({type:'LikedVideo',updatevalue:null})
            updataVideoData({type:'dislikevideo',updatevalue:null})
            updataVideoData({type:'userCurrentActionLIke',updatevalue:null})
            e.target.closest("div").style="pointer-events:auto"
          
          })
          }
          else{
            let uploadLikedData = {[userStatus]:{id:userStatus,action:videoData.userCurrentActionLIke ? videoData.userCurrentActionLIke === 'liked' ? 'disliked' : 'liked' : userAction }}
          
            setDoc(doc(dataBase,'likeVideoList',videoId), uploadLikedData,{ merge: true }).then(()=> {
              updataVideoData({type:'LikedVideo',updatevalue:null})
              updataVideoData({type:'dislikevideo',updatevalue:null})
          e.target.closest("div").style="pointer-events:auto"
            
            })
                .catch(error => error)
          }
          
        }else{
if(userAction == 'liked'){
  dispatch(updatesignInModelUnlogged({data:e.currentTarget,heading:'Like this video?',subheading:'Sign in to make your opinion count.'}))
  // setunloggedpopup({data:e.currentTarget,heading:'Like this video?',subheading:'Sign in to make your opinion count.'})
}else{
  dispatch(updatesignInModelUnlogged({data:e.currentTarget,heading:'Unlike this video?',subheading:'Sign in to make your opinion count.'}))
  // setunloggedpopup({data:e.currentTarget,heading:'Unlike this video?',subheading:'Sign in to make your opinion count.'})
}

         
        }
       
        
    
    
       }

  return (
    <div className='flex  justify-between items-center bg-gray-300 bg-opacity-20 rounded-3xl mr-4 overflow-hidden max-w-[140px] w-full'>


    <div onClick={(e)=> likeMe(e)} className='w-[70px] py-2  flex items-center justify-center hover:bg-gray-400 cursor-pointer transition-all' data-action="likeMe">
    <i data-action="likeMe" className={videoData.LikedVideo ? `fa-solid fa-thumbs-up mr-2` : 'fa-regular mr-2 fa-thumbs-up'}></i> 
      <span className='text-[14px] font-medium' data-action="likeMe"> 
      {/* api likes */}
      {/* {numberCounter(videoDTL?.stats?.likes || 0)} */}
      
    
    {/* my custom likes */}
    {Object.values(videoData.likedList).filter(val => val.action == 'liked').length}
    
      </span>
      </div>
    
    <div className=' border-r-[1px]  border-gray-500 h-full py-4'></div>
      
      
      <div onClick={(e)=> likeMe(e)} className='w-[70px] py-2 hover:bg-gray-400 cursor-pointer transition-all flex items-center justify-center' data-action="disLikeMe">
    
      <i data-action="disLikeMe" className={videoData.dislikevideo ? `fa-thumbs-down mr-2 fa-solid` : 'fa-regular mr-2 fa-thumbs-down'}></i> 
      <span className='text-[14px] font-medium' data-action="disLikeMe"> 
      {Object.values(videoData.likedList).filter(val => val.action == 'disliked').length}</span>
      </div>
    
    </div>
  )
}


