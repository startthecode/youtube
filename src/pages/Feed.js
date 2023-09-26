 import { useEffect, useState } from 'react';
import { forSuggetions,forHome } from '../services/rapidapi';
import { useSelector } from 'react-redux';
import { VideoCardList } from '../components/sections/VideoCardList';


export const Feed = () => {
let [videos,setVideo] = useState([])
let val = useSelector(val=>val.topFilter);
let [error,setError] = useState(false);





useEffect(()=>{


  setVideo([])

if(val.payload){
  // console.log(val.payload)
  forSuggetions(val.payload).then(data=>{
let detail = data.filter(function( element ) {
  return element.type === 'video';
})
// console.log(data)
    setVideo(detail)
    
     }).catch(error => {
      setError(error.message)
      // console.log(error.message)
     })


}else{

  forHome().then(data=>{

setVideo(data)

 }).catch(error =>{
  setError(error.message)
  // console.log(error.message)
 })
// console.log(forHome())
// try{
// let data = forHome();
// setVideo(data)
// }
// catch{
//   console.log('Something Went Wrong')
// }


 
}

  
},[val.payload])





  return (
    <div className='flex flex-wrap justify-between mt-10'> 
  
{

videos && videos.length > 0 ? videos.map((val,index)=>(
    <div className=' basis-3/12 px-4'  key={index}>

<VideoCardList videoData={val.video} />

</div>
  )) : error ? <div className='w-full h-screen fixed bg-black top-0 left-0 text-white text-[50px] z-50 text-center flex justify-center items-center'>{error}</div> : <div className='h-[84vh] w-full flex items-center justify-center'>
    <img className='w-[200px]' src={require('../images/Eclipse-1s-200px.gif')} alt=""  />
  </div> 
}



    </div>
  )
}

