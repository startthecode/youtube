import { useEffect, useState } from "react";
import { channelsubChannels } from "../../services/rapidapi";
import { Link } from "react-router-dom";

export const Channels = ({ channelId, seterror, error }) => {
  let [channelSubChannel, setChannelSubChannel] = useState([]);

  // useEffect(
  //   () => {
  //     seterror(true);
  //     channelsubChannels(channelId)
  //       .then((val) => {
  //         if (val.length >= 0) seterror(false);
  //         setChannelSubChannel(val);
  //       })
  //       .catch((cal) => {
  //         setChannelSubChannel(cal);
  //         seterror(false);
  //       });
  //   },
  //   []
  // );

  return (
    <h5 className="text-[30px] text-white font-bold mt-10  block text-center basis-full">
    No sub Channels Created by the user
  </h5>

  //   <>
  //   {channelSubChannel.length > 0 ? (
  //     <>
  //        <div className=" max-w-[1200px] mx-auto">
  //     <h2 className="mt-6 text-white font-bold text-[20px]">
  //       Fetured channels
  //     </h2>

     
       

  //   </div>
  //   <div className="mt-7 flex flex-wrap mb-20">
  //         {channelSubChannel.map((val, index) => (
  //          <Link to={`channel/${val.channelId}`} className="text-center" key={index}>
  //          <img
  //            className="w-24 h-24 mb-3 rounded-full shadow-lg mx-auto basis-auto"
  //            src={val.avatar[2]?.url || 'https://yt3.googleusercontent.com/sq5rm1ghog5nfzTN0zeUaeXxc2PtB3KvKG2AJpyGN_O0ZPxwUoOS0Y5y1AkbMT1_LTHXMJ94MA=s176-c-k-c0x00ffffff-no-rj-mo'}
  //            alt="Bonnie image"
  //          />
  //          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
  //           {val.title}
  //          </h5>
  //          <span className="text-sm text-gray-500 dark:text-gray-400">
  //           {val.stats.subscribersText}
  //          </span>
  //          <div className="flex mt-4 space-x-3 md:mt-3">
  //            <div className="bg-gray-300 bg-opacity-20 text-[white]  flex items-center py-1.5 px-3 hover:bg-opacity-30 rounded-3xl text-[12px] font-normal mx-auto">
  //              View Channel
  //            </div>
  //          </div>
  //        </Link>
  //         ))}{" "}
  //       </div>
  //     </>
  //   ) : !error ? (
  //     <h5 className="text-[30px] text-white font-bold mt-10  block text-center basis-full">
  //       No sub Channels Created by the user
  //     </h5>
  //   ) : (
  //     <img
  //       className="w-[220px] block mx-auto"
  //       src={require("../../images/Eclipse-1s-200px.gif")}
  //       alt=""
  //     />
  //   )}
  // </>



 
  );
};
