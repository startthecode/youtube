import { useEffect, useState } from "react";
import { autoComplete } from "../../services/rapidapi";

export const SearchBar = () => {

  let [searchList,setSearchList]= useState([]);

  
  function seacrhRSLT(e) {

    autoComplete(e.target.value).then(data => {
      setSearchList(data)
    // console.log(data)
    }).catch(error=>console.log(error)) 


    e.target.value.length > 0
      ? document.querySelector(".emptySearchedText").classList.remove("hidden")
      : document.querySelector(".emptySearchedText").classList.add("hidden");
  }

  function emptyinput(e) {
    // console.log(document.querySelector('.userSerachedText'))
    document.querySelector(".userSerachedText").value = "";
    setSearchList([])
    e.target.classList.add("hidden");
  }


  // useEffect(()=>{


  // },[])


  // let dummyobject = {
  //   query: "english son",
  //   results: [
  //     "english songs",
  //     "english songs with lyrics",
  //     "english songs 2022",
  //     "english songs 2023",
  //     "english song dj",
  //     "english song remix",
  //     "english song new",
  //     "english song ringtone",
  //     "english songs for kids",
  //     "english songs playlist",
  //     "english song status",
  //     "english songs for learning english",
  //     "english songs mmsub",
  //     "english songs 2021"
  //   ]
  // }

  return (
    <>
    {/* {<div className="text-white">{searchList}</div>} */}
      <div className="relative">
        <form className="flex items-center">
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              onChange={(e) => seacrhRSLT(e)}
              className="outline-none  bg-transparent border border-gray-300 text-gray-900 text-sm rounded-full focus:border-gray-300 focus:border-gray-300 block w-full pl-5 py-3  dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-600 dark:focus:border-gray-600 userSerachedText"
              placeholder="Search"
              required
            />

            <i
              className=" hidden fa-solid fa-xmark text-gray-500 dark:text-gray-400 text-[18px] absolute right-0 flex items-center pr-16 top-3.5 emptySearchedText"
              onClick={(e) => emptyinput(e)}
            ></i>
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-5"
            >
              <div className=" bg-slate-600 absolute right-0 top-0 h-full pl-3 pr-5 rounded-tr-full rounded-br-full pt-2.5">
                <i className="fa-solid fa-magnifying-glass text-gray-500 dark:text-gray-400"></i>
              </div>
            </button>
          </div>
        </form>

        {searchList.length > 0 && <div className="w-[94%] bg-[#0f0f0f] border-[0.01px] border-gray-800 absolute top-[55px] rounded-lg  py-3">
          {searchList.map((val) => (
            <div key={val} className="py-2 dark:text-gray-300 flex items-center hover:bg-[#1a1919] px-3">
              
              <i className="fa-solid fa-magnifying-glass text-gray-900 dark:text-gray-700 mr-3"></i>
              {val}
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};
