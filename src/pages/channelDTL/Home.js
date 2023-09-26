import { useEffect, useState } from "react";
import { channelVideos } from "../../services/rapidapi";
import { VideoCardList } from "../../components/sections/VideoCardList";

export const Home = ({ channelId, seterror,error  }) => {
  console.log(channelId);
  let [channelVideo, setChannelVideo] = useState([]);

  useEffect(() => {
    seterror(true)

    channelVideos(channelId)
      .then((val) => {
        if(val.length >= 0) seterror(false)
        setChannelVideo(val)})
      .catch((cal) => {setChannelVideo(cal);seterror(false)});
  
  }, []);

  return (
    <>
      <div className=" max-w-[1200px] mx-auto mt-10 flex flex-wrap ">
        {channelVideo.length > 0 ? (
          channelVideo.map((val, index) => (
            <div key={index} className=" basis-2/12 mb-5">
              <VideoCardList videoData={val} />
            </div>
          ))
        ) : (
          !error ? (<h5 className="text-[30px] text-white font-bold mt-10  block text-center basis-full">
          No videos uploaded yet by the user
        </h5>) : (<img
            className="w-[220px] block mx-auto"
            src={require("../../images/Eclipse-1s-200px.gif")}
            alt=""
          />)
        )}
      </div>
    </>
  );
};
