import ReactPlayer from "react-player";
import "./App.css";
import { Footer, Header } from "./components/layout";
import { AllRoutes } from "./routes/AllRoutes";
import { SideBar } from "./components/sections/SideBar";
import { TopSuggestions } from "./components/sections/TopSuggestions";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { auth, dataBase, provider } from "./services/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  updateSigninstatus,
  updateUserstatus,
  updateuserFullDtl,
  updateyouTubeUserName,
} from "./store/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { randomNumber } from "./hooks/randomNumber";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

function App() {
  let currentLocation = useLocation().pathname;
  let hideFrom = ["/watch/", "/channel/"];
  let sideBar_topSuggestion = true;
  let dispatch = useDispatch();
  let val = useSelector((val) => val.userinfo);

  // useEffect(())

  async function getRegistredUser(param) {
    const docRef = doc(dataBase, "registeredUser", param);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data()) {
      let commentsDataKey = Object.keys(docSnap.data());
      let commentsDataentries = Object.values(docSnap.data());

      return docSnap.data();
      // let commentData = commentsDataKey.map((val ,index) => { return {[val] : commentsDataentries[index]}});
      // setComments(commentsDataentries)
    }

    return false;
    // setComments([...docSnap.data()])
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(updateUserstatus({ userStatus: user.uid }));
        dispatch(updateuserFullDtl({ userFullDtl: user }));

        getRegistredUser(user.uid)
          .then((val) => {
            dispatch(
              updateyouTubeUserName({ youTubeUserName: val.youtubeUsername })
            );
          })
          .catch(() => {});
      }
    });
  }, []);

  useEffect(() => {
    function signinPopup() {
      signInWithPopup(auth, provider)
        .then((result) => {
          getRegistredUser(result.user.uid).then((val) => {
            if (!val) {
              let data = {
                name: result.user.displayName,
                youtubeUsername:
                  result.user.displayName.replace(" ", "").toLowerCase() +
                  String(randomNumber()).slice(0, -5),
                  desktopImg:null,
                  userProfile:result.user.photoURL,
                  subscribers:0,
                  videos:0
              };

              setDoc(
                doc(dataBase, "registeredUser", result.user.uid),
                { ...data },
                { merge: true }
              )
                .then(() => {
                  dispatch(
                    updateyouTubeUserName({
                      youTubeUserName: val.youtubeUsername,
                    })
                  );

                  dispatch(updateUserstatus({ userStatus: result.user.uid }));
                  dispatch(updateuserFullDtl({ userFullDtl: result.user }));
                })
                .catch((error) => {
                  // Handle Errors here.
                });
            } else {
              // dispatch(updateyouTubeUserName({youTubeUserName:val.youtubeUsername}))
            }
          });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);

          // ...
        });

      dispatch(updateSigninstatus({ signInStatus: false }));
    }

    val.signinpopStatus && signinPopup();
  }, [val.signinpopStatus]);

  hideFrom.forEach((val) => {
    if (currentLocation.includes(val)) {
      sideBar_topSuggestion = false;
    }
  });

  // function signinPopup() {
  //   signInWithPopup(auth, provider)
  //   .then((result) => {

  //       dispatch(updateUserstatus({userStatus:result.user.uid}))
  //       dispatch(updateuserFullDtl({userFullDtl:result.user}))

  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...

  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);

  //     // ...
  //   });

  //   dispatch(updateSigninstatus({signInStatus:false}))

  // }

  // signOut(auth)
  return (
    <>
      {/* {val.signinpopStatus && signinPopup()} */}
      <h1 className="text-[12px] z-50 bg-black px-2 py-1 text-white mt-20 fixed right-0 border-white border top-8">
        {val.userStatus}
      </h1>
      <h1
        className="text-[12px] z-50 bg-black px-2 py-1 text-white mt-20 fixed right-0 border-white border"
        onClick={() => signOut(auth)}
      >
        {val.youTubeUserName}
      </h1>

      <Header />

      <main className=" dark:bg-[#0f0f0f] pt-[80px]">
        <div className="flex justify-end">
          {sideBar_topSuggestion && (
            <div>
              <SideBar />
            </div>
          )}

          {/* <h1 className='text-[400px]'>{val.userStatus}</h1> */}
          <div
            className={`${
              sideBar_topSuggestion ? "basis-10/12" : "basis-12/12 w-full"
            } flex-grow-0 overflow-hidden`}
          >
            {sideBar_topSuggestion && <TopSuggestions className="" />}

            <AllRoutes />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
