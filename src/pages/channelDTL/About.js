import { useEffect } from "react";
import { Link } from "react-router-dom";

export const About = ({channelData,channelId, seterror, error}) => {
 useEffect(()=>{
  console.log(channelData)

 },[channelData])
  return (
    channelData &&  <div className=" max-w-[1200px] mx-auto flex justify-between">
      <div className="basis-8/12">
        <h2 className="mt-6 text-white font-bold text-[20px]">Description</h2>

        <p className="text-white text-[16px] mt-3 text-justify">
          {channelData?.description}
        </p>

        <div className=" mt-14  border-t-[1px] border-gray-700">
          <h2 className="mt-6 text-white font-bold text-[20px]">Details</h2>
          <div className="flex items-center mt-5">
            <p className="text-[12px] text-gray-500">For business enquiries:</p>
            <Link
              to={``}
              className="
       bg-[#f1f1f1] text-black py-2 px-3 hover:bg-[#d9d9d9]
         rounded-3xl ml-5 text-[12px] font-normal flex"
            >
              View Email Address
            </Link>
          </div>
        </div>

        <div className=" mt-12 pb-8 border-y-[1px] mb-5 border-gray-700">
          <h2 className="mt-6 text-white font-bold text-[20px]">Links</h2>
          <div className="flex flex-wrap max-w-[600px]">
            <div className="mt-5 basis-6/12">
              <p className="text-[12px] text-white">Delta 2.0 (New)</p>
              <Link
                to={`/apnacollege.in/course/delta-batch-2`}
                className=" text-blue-600 text-[12px]"
              >
                View Email Address
              </Link>
            </div>
            <div className="mt-5 basis-6/12">
              <p className="text-[12px] text-white">Delta 2.0 (New)</p>
              <Link
                to={`/apnacollege.in/course/delta-batch-2`}
                className=" text-blue-600 text-[12px]"
              >
                View Email Address
              </Link>
            </div>
            <div className="mt-5 basis-6/12">
              <p className="text-[12px] text-white">Delta 2.0 (New)</p>
              <Link
                to={`/apnacollege.in/course/delta-batch-2`}
                className=" text-blue-600 text-[12px]"
              >
                View Email Address
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="basis-3/12 mt-6">
        <p className="text-white px-2 text-[18px] pb-3 mb-4 border-b-[1px] border-gray-700">
          {" "}
          stats
        </p>
        <p className="text-white px-2 text-[16px] pb-3 mb-4 border-b-[1px] border-gray-700">
          {" "}
          Joined 5 Aug 2020
        </p>
        <p className="text-white px-2 text-[16px] pb-3 mb-4 border-b-[1px] border-gray-700">
          {" "}
          646,827,128 views
        </p>
      </div>
    </div>
  );
};
