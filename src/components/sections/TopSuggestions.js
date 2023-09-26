
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import { userSuggestion } from "../../utils/constants"
import { useDispatch, useSelector } from 'react-redux';
import { updatedfilter } from '../../store/topFilerSlice';



export const TopSuggestions = () => { 

let val = useSelector(val=>val.topFilter);
let dispatch = useDispatch();

  function filterCAT(val){
    dispatch(updatedfilter(val.target.innerText))
    console.log(val.target.innerText)
    }

  return (
  
    <div className="flex overflow-x-auto cstm-scroll w-full max-w-full mb-5">

<OwlCarousel items={0}  
          className="owl-theme topSugestions flex"  
          dots={false}
          autoWidth
          margin={8} >  
            {userSuggestion.map(val=>(
        <button onClick={function (param) { filterCAT(param) }} key={val.name} className=" text-white bg-gray-800 px-5 mr-3 text-md py-1.5 rounded-md max-w-max w-full whitespace-nowrap block">{val.name}</button>
      ))}
      </OwlCarousel>  

    
      </div>
 
  )
}

