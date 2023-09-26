import { Link } from "react-router-dom"
import { sidebarData } from "../../utils/constants"
export const SideBar = () => {
  return (
    <div>

<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-8 py-4 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f] pt-[100px]">
      <ul className="space-y-2 font-medium border-b-2 border-gray-700 pb-4">
       
      {sidebarData.map(val=>(
          <li key={val.name}>
          <Link to={val.link} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <i className={`${val.icon} text-[19px]`}></i>
             <span className="ml-3 text-[16px] font-light">{val.name}</span>
          </Link>
       </li>
      ))}
       
         
      </ul>
   </div>
</aside>

     
    </div>
  )
}

