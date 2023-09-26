import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { relatedVideos } from "../../services/rapidapi";
import { numberCounter } from "../../hooks/numberCounter";

const RelatedVideos = ({videoId}) => {

let [data,setData] = useState([]);
let [error,setError] = useState(false)



useEffect(()=>{

  relatedVideos(videoId).then(val=> setData(val)).catch(error => setError(error.message))

},[videoId])

  return (
   <>

   {

data.length > 0 ?
    data.map(val=>(
        val.video?.videoId &&
        <Link to={`/watch/${val.video.videoId}`} key={val.video.videoId} className="flex mb-6 cursor-pointer" onClick={window.scrollTo(0,0)}>
<div className=" basis-5/12 rounded-md overflow-hidden">
<img className="w-full h-[100px] object-cover object-center" src={val.video?.thumbnails[0].url ? val.video.thumbnails[1].url : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"} alt="" />

</div>

<div className=" basis-7/12 px-2 rounded-md overflow-hidden">
   <p className=" h-[45px] overflow-hidden text-[14px]">
    {val.video.title}
    </p> 

   <div className="flex items-center">
    
   <p className="mb-0 text-md text-gray-900 dark:text-gray-400 mr-1">{val.video.author.title} </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 24 24"><path fill="gray" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
   
   </div>
        
   <div className="flex items-center">
           <span className="text-[12px] text-gray-900 dark:text-gray-400 block">{numberCounter(val.video.stats.views || 200)  } views</span> 
           <span className="text-[20px] text-gray-900 dark:text-gray-400 font-bold block leading-[0] px-2 -mt-3"> . </span>
           <span className="text-gray-900 dark:text-gray-400 block text-[12px]">{val.video.publishedTimeText}</span></div>
        
</div>

   </Link>

    )) : error ? (<div className='text-center'>{error}</div>) : <img className='w-[200px] block text-center mx-auto' src={require('../../images/Eclipse-1s-200px.gif')} alt=""  />
   }
   </>
  )
}

export default RelatedVideos
