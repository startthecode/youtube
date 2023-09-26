import { Route, Routes} from "react-router-dom";

import {
  Channels,
  Community,
  Home,
  Live,
  PlayList,
  Shorts,
  Videos,
} from "../pages/channelDTL/";
import { About } from "../pages/channelDTL/About";

export const ChannelRoutes = ({ channelId, seterror, error, channelData }) => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Home seterror={seterror} error={error} channelId={channelId} />
        }
      />
      <Route
        path="/"
        element={
          <Home seterror={seterror} error={error} channelId={channelId} />
        }
      />

      <Route
        path="/videos"
        element={
          <Videos seterror={seterror} error={error} channelId={channelId} />
        }
      />
      <Route
        path="/shorts"
        element={
          <Shorts seterror={seterror} error={error} channelId={channelId} />
        }
      />
      <Route
        path="/live"
        element={
          <Live seterror={seterror} error={error} channelId={channelId} />
        }
      />
      <Route
        path="/playlist"
        element={
          <PlayList seterror={seterror} error={error} channelId={channelId} />
        }
      />
      <Route
        path="/community"
        element={
          <Community seterror={seterror} error={error} channelId={channelId} />
        }
      />
      <Route
        path="/channels"
        element={
          <Channels seterror={seterror} error={error} channelId={channelId} />
        }
      />
      <Route
        path="/about"
        element={
          <About seterror={seterror} error={error} channelId={channelId} channelData={channelData} />
        }
      />

     
    </Routes>
  );
};
