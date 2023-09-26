import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"


export const ScrollToTop = () => {
let pageLocation = useLocation().pathname;

    useEffect(()=>{

        window.scrollTo(0,0)


    },[pageLocation])

}

