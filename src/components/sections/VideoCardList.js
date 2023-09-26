import { Link } from "react-router-dom"
import { numberCounter } from "../../hooks/numberCounter";

export const VideoCardList = ({videoData}) => {
    // videoTitle,videoThumbimg,videoThumbMove,videoID,videoLength,videoChannel,videoChannelID

    return (
    <>
      {/* {console.log(videoData)} */}
<div className=" w-full">
<Link to={`/watch/${videoData.videoId}`}>
        <img className="rounded-lg" src={videoData.thumbnails[0].url} alt={videoData.title} />
</Link>
    
    <div className="py-5 px-3">
        <Link to={`/watch/${videoData.videoId}`}>
            <h5 className="mb-1 text-[19px] tracking-tight text-gray-900 dark:text-white">{videoData.title}</h5>
        </Link>

              {videoData.author?.channelId && <Link to={`/channel/${videoData.author.channelId}`} className="flex items-center mb-1">
            <p className="mb-0 text-md text-gray-900 dark:text-gray-400 mr-1">{videoData.author.title} </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 24 24"><path fill="gray" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"/></svg>
        </Link>}
        <Link className="flex items-center" to={`/watch/${videoData.videoId}`}>
           <span className="text-[12px] text-gray-900 dark:text-gray-400 block">{ numberCounter(videoData.stats.views || 200)} views</span> 
           <span className="text-[20px] text-gray-900 dark:text-gray-400 font-bold block leading-[0] px-2 -mt-3"> . </span>
           <span className="text-gray-900 dark:text-gray-400 block text-[12px]">{videoData.publishedTimeText}</span>
        </Link>
      
    </div>
</div>

    </>
  )
}

