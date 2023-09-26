import { Link } from "react-router-dom"
import { SearchBar } from "../elements"

export const Header = () => {
  return (
    <header className="fixed z-[1000] left-0 top-0 w-full">
      <div className="flex bg-[#0f0f0f] relative z-[10000] px-9 justify-between items-center py-3.5">
        <div className=" basis-2/12 flex items-center ">
        <i className="fa-solid fa-bars text-[22px] mr-5 text-white"></i>
<Link to='/' >
  <img className="w-[120px]"
   src={require('../../images/youtube-logo.png')} 
   alt="" />
</Link>
        </div>

        <div className=" basis-5/12">
          <SearchBar />
        </div>

        <div className=" basis-2/12 flex justify-end items-center">

<div className="relative mr-8"> <i className="fa-solid fa-bell text-gray-500 dark:text-gray-400 text-[25px] "></i>
<span className=" bg-red-600 text-white text-[10px] absolute -top-2 -right-2 h-[18px] rounded-full w-[18px] flex justify-center items-center">1</span>
</div>

<div className="h-[40px] w-[40px] rounded-full overflow-hidden">
  <img src="https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png" alt="" />
</div>


        </div>

      </div>
    </header>
  )
}

