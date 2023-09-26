import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { dataBase } from "../../../services/firebase";
import { useCallback, useEffect, useReducer, useState } from "react";
import { options } from "../../../utils/constants";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { updatesignInModelUnlogged } from "../../../store/signInModelUnlogged";
import { useDispatch, useSelector } from "react-redux";

export const Subscribe = ({
  videoDTL,
  userStatus,
  subscribersList = false,
  updatesubscribersList = false,
  channelId,
  setunloggedpopup = { setunloggedpopup },
}) => {
  let [subscribedData, setSubscribeddata] = useState({
    subscribed: false,
    notification: null,
  });
  let dispatch = useDispatch();
  let signInModelForUnlogged = useSelector((val) => val.signInModelForUnlogged);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  let [refreshData, setRefreshData] = useState(false);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function updateSubscribeList() {
      const docRef = doc(dataBase, "subscribedChnList", channelId);
      const docSnap = await getDoc(docRef);
       updatesubscribersList(0);

      setSubscribeddata({ subscribed: false, notification: null });
      if (docSnap.exists() && docSnap.data()) {
        updatesubscribersList(Object.keys(docSnap.data()).length);
        if (docSnap.data().hasOwnProperty(userStatus)) {
          setSelectedIndex(docSnap.data()[userStatus].index);
          setSubscribeddata({
            subscribed: true,
            notification: docSnap.data()[userStatus].notification,
          });
        } else {
          // setSubscribeddata({type:'LikedVideo',updatevalue:false})
          // setSubscribeddata({type:'dislikevideo',updatevalue:false})
        }
      }
    }

    updateSubscribeList();
  }, [userStatus, channelId, updatesubscribersList]);

  function subscribeMe(e, clickAction) {
    let notificationData = { text: "all", index: 0 };
    let subscribeUpdate = true;
    let updateData = false;

    if (userStatus) {
      if (subscribedData.subscribed) {
        if (
          clickAction !== "unsubscribeMe" &&
          clickAction !== "updateNotification"
        ) {
          setAnchorEl(e.currentTarget);
        }

        if (clickAction === "unsubscribeMe") {
          subscribeUpdate = false;
          updateData = true;
          updatesubscribersList(subscribersList);
        } else if (clickAction === "updateNotification") {
          notificationData = e;
          updateData = true;
        }
        // let data_subscribedValue = e.target.dataset.subscribed;

        //  console.log(e.currentTarget)
      } else {
        updateData = true;
      }
      if (updateData) {
        if (subscribeUpdate) {
          let uploadLikedData = { [userStatus]: notificationData };
          // e.target.closest("div").style="pointer-events:none";
          setDoc(
            doc(dataBase, "subscribedChnList", channelId),
            uploadLikedData,
            { merge: true }
          ).then(() => {
            setSubscribeddata({ ...subscribedData, subscribed: true });
             updatesubscribersList(subscribersList);
            setRefreshData(!refreshData);
            setDoc(
              doc(dataBase, "registeredUser", userStatus),
              {
                subscribedChannel: {
                  [channelId]: { ...notificationData, ...videoDTL.author },
                },
              },
              { merge: true }
            ).then(() => {});
          });
        } else {
          updateDoc(doc(dataBase, "subscribedChnList", channelId), {
            [userStatus]: deleteField(),
          }).then(() => {
            setSubscribeddata({ subscribed: false, notification: null });
            updatesubscribersList(subscribersList);
            setRefreshData(!refreshData);
            setDoc(
              doc(dataBase, "registeredUser", userStatus),
              { subscribedChannel: { [channelId]: "nothing" } },
              { merge: true }
            ).then(() => {});
          });
        }
      }
    } else {
      dispatch(
        updatesignInModelUnlogged({
          data: e.currentTarget,
          heading: "Want to subscribe to this channel?",
          subheading: "Sign in to subscribe to this channel.",
        })
      );
    }
  }

  return (
    <>
    
      <button
        className={`${
          subscribedData.subscribed
            ? "bg-gray-300 bg-opacity-20 text-[white]  flex items-center py-2 px-2 hover:bg-opacity-30"
            : "bg-[#f1f1f1] text-black py-2 px-5 hover:bg-[#d9d9d9]"
        } rounded-3xl ml-12 text-[14px] font-normal flex`}
        onClick={(e) => subscribeMe(e, "suscribeAction")}
      >
        {subscribedData.subscribed ? (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: options[selectedIndex].icon }}
              className="mr-2 scale-90"
            ></div>

            <div data-subscribed="unSubscribedME">Subscribed</div>

            <div
              id="lock-button"
              className="ml-2"
              aria-expanded={open ? "true" : undefined}
            >
              <svg
                data-subscribed="notificationMenu"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="10"
                viewBox="0 0 16 7"
              >
                <path
                  fill="currentColor"
                  d="M8 6.5a.47.47 0 0 1-.35-.15l-4.5-4.5c-.2-.2-.2-.51 0-.71c.2-.2.51-.2.71 0l4.15 4.15l4.14-4.14c.2-.2.51-.2.71 0c.2.2.2.51 0 .71l-4.5 4.5c-.1.1-.23.15-.35.15Z"
                />
              </svg>
            </div>
          </>
        ) : (
          <div data-subscribed="subscribedME">Subscribe</div>
        )}{" "}
      </button>
      <div>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="subscribSection"
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              className="bg-red-300 mb-3 hover:bg-red-600"
              key={option.text}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {
                <div
                  className="flex text-white px-3"
                  {...(option.text === "Unsubscribe"
                    ? { onClick: (e) => subscribeMe(e, "unsubscribeMe") }
                    : {
                        onClick: (e) =>
                          subscribeMe(
                            { text: option.text, index: index },
                            "updateNotification"
                          ),
                      })}
                >
                  <span
                    className="mr-2.5"
                    dangerouslySetInnerHTML={{ __html: option.icon }}
                  ></span>{" "}
                  {option.text}
                </div>
              }
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
};
