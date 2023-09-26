import { useEffect, useReducer, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import RelatedVideos from "../components/sections/RelatedVideos";
import { VideoComments, VideoDetails } from "../services/rapidapi";
import { numberCounter } from "../hooks/numberCounter";
import { useDispatch, useSelector } from "react-redux";
import { updateSigninstatus } from "../store/userInfo";
import {
  PopUpUnloggedUser,
  LikeUnlike,
  CommentCard,
  Subscribe,
  CommentSEC,
} from "../components/elements";
import { updateVideoId } from "../store/userCurrentVideoID";

export const VideoDTL = () => {
  let videoId = useParams().id;
  let [half, setHalf] = useState(false);
  let [cannelID, setcannelID] = useState(false);

  let [videoDTL, setVideoDTL] = useState(null);
  let [error, setError] = useState(false);
  let { userStatus, userFullDtl } = useSelector((val) => val.userinfo);
  let [unloggedpopup, setunloggedpopup] = useState({
    data: false,
    heading: "dummy heading",
    subheading: "this is sub heading",
  });
  let [subscribersList, updatesubscribersList] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    VideoDetails(videoId)
      .then((val) => {
        setVideoDTL(val);
        setcannelID(val?.author?.channelId && val.author.channelId);
      })
      .catch((error) => setError(error.message));
    dispatch(updateVideoId(videoId));
  }, [videoId, dispatch]);

  console.log(videoDTL);

  //  onClick={()=> dispatch(updateSigninstatus({signInStatus:true}))}
  return (
    <div className="text-white flex">
      {!userStatus && (
        <PopUpUnloggedUser
          data={unloggedpopup}
          setunloggedpopups={setunloggedpopup}
        />
      )}
      {/* <div onClick={(e)=>setunloggedpopup({...unloggedpopup,data:e.currentTarget})} className='h-[20px] cursor-pointer' aria-describedby='simple-popover' variant="contained"> aaaa</div> */}

      <div className=" rounded-xl overflow-hidden w-full basis-9/12 px-5">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          playing={true}
          muted
          controls
          width="100%"
          height=""
          className="block h-[550px]"
        />
        {videoDTL?.author || true ? (
          <div>
            <h1 className="text-white text-[19px] mt-5 font-medium">
              {videoDTL?.title}
            </h1>
            <div className="flex  justify-between items-center mt-4">
              <div className="flex justify-between items-center">
                <Link
                  to={
                    videoDTL?.author?.channelId
                      ? `/channel/${videoDTL.author.channelId}`
                      : "/"
                  }
                  className="flex justify-between items-center"
                >
                  <img
                    className="w-[42px] h-[42px] rounded-full mr-4"
                    src={
                      videoDTL?.author?.avatar[0].url ||
                      "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png"
                    }
                    alt=""
                  />
                  <div>
                    <p className="font-medium text-[16px] ">
                      {videoDTL?.author?.title || "Creater"}
                    </p>
                    {/* api subscriber List */}
                    {/* <p className='text-[12px] text-stone-300'>{numberCounter(videoDTL?.author?.stats?.subscribers || 0)} subscribers</p> */}

                    <p className="text-[12px] text-stone-300">
                      {numberCounter(subscribersList)} subscribers
                    </p>
                  </div>
                </Link>
                {cannelID && (
                  <Subscribe
                    videoDTL={videoDTL}
                    videoId={videoId}
                    channelId={cannelID}
                    userStatus={userStatus}
                    subscribersList={subscribersList}
                    updatesubscribersList={updatesubscribersList}
                    setunloggedpopup={setunloggedpopup}
                  />
                )}
              </div>

              <div className="flex justify-between items-center likeunlikeKeys">
                <LikeUnlike
                  userStatus={userStatus}
                  videoId={videoId}
                  setunloggedpopup={setunloggedpopup}
                />
                <div className="flex  justify-between items-center bg-gray-300 bg-opacity-20 px-5 py-2 rounded-3xl mr-4">
                  <i className="fa-solid fa-share text-[19px] mr-2"></i>
                  <span className="text-[14px] font-medium">Share</span>
                </div>

                <div className="flex  justify-between bg-gray-300 bg-opacity-20 h-[40px] w-[40px] text-center items-center rounded-full">
                  <i className="fa-solid fa-ellipsis text-center mx-auto"></i>
                </div>
              </div>
            </div>

            <div
              className={`detailsSection bg-gray-300 bg-opacity-20 py-4 pb-10 px-3 mt-4 rounded-lg relative`}
            >
              <p className="text-[14px] font-medium">
                {numberCounter(videoDTL?.stats?.views || 0)} Views{" "}
                <span className="ml-2 text-[11px] text-stone-300">
                  Released on - {videoDTL?.publishedDate || "2023"}
                </span>
              </p>
              <button
                onClick={() => setHalf(!half)}
                className=" absolute bottom-0 right-0 px-3 text-[15px] py-2"
              >
                {!half ? "Show more" : "show less"}
              </button>
              <p
                className={`description mt-2 text-[14px] font-normal ${
                  half ? "h-auto" : "h-[40px]"
                } overflow-hidden`}
              >
                {videoDTL?.description || "sorry no description "}
              </p>
            </div>

            <div className="comments">
              <CommentSEC
                userStatus={userStatus}
                userFullDtl={userFullDtl}
                setunloggedpopup={setunloggedpopup}
              />
            </div>
          </div>
        ) : error ? (
          <div className="text-center mt-10">{error}</div>
        ) : (
          <div className="   w-full flex items-center justify-center">
            <img
              className="w-[200px]"
              src={require("../images/Eclipse-1s-200px.gif")}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="basis-3/12">
        <RelatedVideos videoId={videoId} />
      </div>
    </div>
  );
};
