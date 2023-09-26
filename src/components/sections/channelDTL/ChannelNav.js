import { ChannelRoutes } from "../../../routes/ChannelRoutes"
import { channelDtlNav } from "../../../utils/constants"
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import { Link, NavLink, useParams } from "react-router-dom";


export const ChannelNav = () => {
let urlID = useParams().subID
console.log(urlID)
    return (
   <div className=" border-b-[1px] border-[#f1f1f12f] w-full">

<OwlCarousel items={5}  
          className="owl-theme flex"  
          dots={false}
          autoWidth
          margin={8} >  
           {channelDtlNav.map(({title,value},index)=>(
        <NavLink key={index} to={value} className="px-7 text-[15px] font-medium block text-[#aaa] pb-4 uppercase channelDtlNAV" >
    {title}
        </NavLink>
    ))}
      </OwlCarousel>  
   
   </div>
  )
}
