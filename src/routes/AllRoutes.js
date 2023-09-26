import { Route, Routes } from "react-router-dom"
import { ChannelDTL, Feed, Search, VideoDTL } from "../pages"
import { ChannelNav } from "../components/sections/channelDTL/ChannelNav"

export const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Feed />} />
    <Route path="/results" element={<Search />} />
    <Route path="/watch/:id" element={<VideoDTL />} />
    <Route path="/channel/:id/*" element={<ChannelDTL />} />

    {/* <Route path="*" element={<ChannelDTL />} /> */}


    </Routes>
  )
}

