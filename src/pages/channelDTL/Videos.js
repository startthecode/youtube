import { useEffect, useState } from "react";
import { channelVideos } from "../../services/rapidapi";
import { VideoCardList } from "../../components/sections/VideoCardList";
export const Videos = ({ channelId, seterror, error }) => {
  console.log(channelId);
  let [channelVideo, setChannelVideo] = useState([]);

  useEffect(
    () => {
      seterror(true);
      channelVideos(channelId)
        .then((val) => {
          if (val.length >= 0) seterror(false);
          setChannelVideo(val);
          console.log('happy',val)

        })
        .catch((cal) => {
          setChannelVideo(cal);
          console.log('happy')
          seterror(false)
        });
    },
    []
  );

  function sorter(param, e) {
    e.preventDefault();
    let [...newArray] = channelVideo;

    const timeUnits = {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400, // Assuming 30 days in a month
      week: 604800,
      month: 2592000, // 30 days in a month on average
      year: 31536000, // Approximate number of seconds in a year
    };

    function sec(timeFrame) {
      console.log(timeFrame);
      let timeString = timeFrame
        .match(/\b\d+\s+(\w+)\s+ago\b/)[1]
        .replace(/s$/, "");
      let timeNumber = timeFrame.split(" ")[0];

      return timeUnits[timeString] * timeNumber;
    }

    newArray.sort((a, b) => {
      if (!a.publishedTimeText) return channelVideo;
      if (param === "old" || param === "new") {
        let ta = sec(a.publishedTimeText);
        let tb = sec(b.publishedTimeText);
        if (param === "old") return tb - ta;
        if (param === "new") return ta - tb;
      }

      if (param === "popular" || param === "unPopular") {
        let ta = a.stats.views;
        let tb = b.stats.views;
        if (param === "popular") return tb - ta;
        if (param === "unPopular") return ta - tb;
      }
      return channelVideo;
    });

    setChannelVideo(newArray);
    return channelVideo;
  }

  return (
    <>
      {channelVideo.length > 0 ? (
        <>
          <div className="flex max-w-[1200px] mx-auto mt-5 ">
            <button
              onClick={(e) => sorter("new", e)}
              className=" text-white bg-gray-800 text-[14px] px-3 mr-3 text-md py-1 rounded-md max-w-max w-full whitespace-nowrap block"
            >
              Latest
            </button>

            <button
              onClick={(e) => sorter("popular", e)}
              className=" text-white bg-gray-800 text-[14px] px-3 mr-3 text-md py-1 rounded-md max-w-max w-full whitespace-nowrap block"
            >
              Popular
            </button>

            <button
              onClick={(e) => sorter("unPopular", e)}
              className=" text-white bg-gray-800 text-[14px] px-3 mr-3 text-md py-1 rounded-md max-w-max w-full whitespace-nowrap block"
            >
              Less Popular
            </button>

            <button
              onClick={(e) => sorter("old", e)}
              className=" text-white bg-gray-800 text-[14px] px-3 mr-3 text-md py-1 rounded-md max-w-max w-full whitespace-nowrap block"
            >
              Oldest
            </button>
          </div>
          <div className=" max-w-[1200px] mx-auto mt-10 flex flex-wrap">
            {channelVideo.map((val, index) => (
              <div className=" basis-2/12 mb-5" key={index}>
                <VideoCardList videoData={val} />
              </div>
            ))}{" "}
          </div>
        </>
      ) : !error ? (
        <h5 className="text-[30px] text-white font-bold mt-10  block text-center basis-full">
          No videos uploaded yet by the user
        </h5>
      ) : (
        <img
          className="w-[220px] block mx-auto"
          src={require("../../images/Eclipse-1s-200px.gif")}
          alt=""
        />
      )}
    </>
  );
};
