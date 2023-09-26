import { BrowserRouter as router, Link, useParams, Routes, Route } from "react-router-dom";
import { musicIcon, rightIcon } from "../icons/svg";
import { Subscribe } from "../components/elements";
import { channelDetails } from "../services/rapidapi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dataBase } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import { ChannelNav } from "../components/sections/channelDTL/ChannelNav";
import { ChannelRoutes } from "../routes/ChannelRoutes";
import { AllRoutes } from "../routes/AllRoutes";

export const ChannelDTL = () => {
  let channelId = useParams().id;
  let [channelData, setChannelData] = useState(false);
  let [channelDataFirebase, setChannelDataFirebase] = useState(false);

  let [subscribersList, updatesubscribersList] = useState(0);
  let { userStatus, userFullDtl } = useSelector((val) => val.userinfo);
let [error,seterror] = useState(false)
  let [unloggedpopup, setunloggedpopup] = useState({
    data: false,
    heading: "dummy heading",
    subheading: "this is sub heading",
  });

  useEffect(() => {
    channelDetails(channelId)
      .then((val) => {
        setChannelData(val);
      })
      .catch((val) => {
        async function updateSubscribeList() {
          const docRef = doc(dataBase, "registeredUser", channelId);
          const docSnap = await getDoc(docRef);
           updatesubscribersList(0);
    
          if (docSnap.exists() && docSnap.data()) {
          
            setChannelDataFirebase(docSnap.data())
          }
        }
        updateSubscribeList()

      });
  }, [channelId]);

  return (
    channelData || channelDataFirebase ? (
      <section className="channelDTL">
        <div className="topBanner user-bg-picture flex justify-center">
          <img
            src={`${ channelData ? channelData?.banner?.desktop[0]?.url : channelDataFirebase.desktopImg || 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?cs=srgb&dl=pexels-andrew-neel-3178786.jpg&fm=jpg'}`}
            className="h-[200px] w-full -mx-8 object-cover object-center"
            alt=""
          />
        </div>

        <div className="flex justify-between w-full mx-auto max-w-[1200px] items-center">
          <div className="userBio max-w-[1280px] flex  mt-[40px] ">
            <img
              id="img"
              draggable="false"
              className="style-scope yt-img-shadow rounded-full mr-5"
              alt="Profile Image"
              width="128"
              src={ channelData ? channelData?.avatar[2]?.url : channelDataFirebase?.userProfile || 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?cs=srgb&dl=pexels-andrew-neel-3178786.jpg&fm=jpg'}
            ></img>

            <div>
              <p className="userName text-[24px] font-[400] text-[#f1f1f1] flex items-center">
                {channelData?.title || channelDataFirebase?.name} &nbsp;
                <span dangerouslySetInnerHTML={{ __html: musicIcon }}></span>
              </p>

              <p className="text-[14px] text-[#aaaaaa] font-[400] mt-1">
                <span className="channelName mr-3 font-[500]">
                  {" "}
                  {channelData?.username || channelDataFirebase?.youtubeUsername}
                </span>
                <span className="channelSubscribers mr-3">
                  {subscribersList} Subscribers
                </span>
                <span className="totalVideos">
                  {channelData?.stats?.videos || channelDataFirebase?.videos} Videos
                </span>
              </p>

              <Link
                to="/"
                className="text-[14px] text-[#aaaaaa] font-[400] mt-3 flex"
              >
                More about this channel
                <span
                  dangerouslySetInnerHTML={{ __html: rightIcon }}
                  className="ml-2"
                ></span>
              </Link>
            </div>
          </div>

          <div className="channelSubscribeButton">
            {
              <Subscribe
                videoDTL={channelData}
                channelId={channelId}
                userStatus={userStatus}
                setunloggedpopup={setunloggedpopup}
                subscribersList={subscribersList}
                updatesubscribersList={updatesubscribersList}
              />
            }
          </div>
        </div>



<div className="channelNav flex justify-between w-full mx-auto max-w-[1200px] items-center mt-[30px]">
<ChannelNav />
</div>
<div className="channelInnerPages">
<ChannelRoutes channelId={channelId} channelData={channelData} seterror={seterror} error={error} />
</div>

      </section>
    ) :''
  ) ;
};
