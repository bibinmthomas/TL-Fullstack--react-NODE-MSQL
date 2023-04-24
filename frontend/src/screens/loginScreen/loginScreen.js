import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register, login } from "../../actions/userActions";
import { userLoginSuccess } from "../../features/users/userLoginSlice";
import { useNavigate } from "react-router-dom";
//firebase
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { authentication } from "../../firebase";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import InstagramLogin from "instagram-login-react";

import toast, { Toaster } from "react-hot-toast";

function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loadingRegister, errorRegister } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setCheckPassword("");
    if (userInfo?.email) {
      navigate("/");
    }
    // if (error) {
    //   toast(error);
    // }
    // if (errorRegister) {
    //   toast(errorRegister);
    // }
  }, [userInfo, selected]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (selected) {
      console.log(email, password);
      await dispatch(login(email, password));
      if (error) {
        toast(error);
      }
    } else {
      console.log(name, email, password);
      await dispatch(register(name, email, password));
      if(errorRegister){
        toast(errorRegister);
      }
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.displayName);
        console.log(user.email);
        let name = user.displayName;
        let email = user.email;
        dispatch(userLoginSuccess({ name, email }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const responseFacebook = (response) => {
    console.log("Log In:", response);
  };
  const componentClicked = (data) => {
    console.log("data:", data);
  };
  const responseInstagram = (response) => {
    console.log(response);
  };

  return (
    <div
      className="relative lg:py-20 bg-no-repeat bg-center"
      style={{
        height: "100vh",
        backgroundImage: `url(/images/istockphoto-1278250468-1024x1024-transformed.jpeg)`,
        backgroundSize: "cover",
      }}
    >
      <Toaster />
      {/* {errorRegister && toast(errorRegister)} */}
      {/* {error && toast(error)} */}
      <div
        className="flex flex-col items-center justify-between pt-0 pr-0 pb-0 pl-0 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row"
      >
        <div className="flex flex-col items-center w-full pt-0 pr-10 pb-0 pl-10 lg:pt-0 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              {/* <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" class="btn-"/> */}
            </div>
          </div>
          <div className="w-full max-w-2xl lg:w-5/12">
            <div className="flex flex-col items-start justify-start mt-0 px-24 py-3 bg-opacity-10 shadow-2xl rounded-xl relative z-10">
              <div className="w-full max-w-sm mx-auto text-center">
                <div className="w-full m-auto flex flex-col mb-6 rounded-xl">
                  <div className="relative w-full rounded-md border-gray-950 h-10 p-1 bg-white mt-6">
                    <div className="relative w-full h-full flex items-center">
                      <div
                        onClick={() => setSelected(!selected)}
                        className="w-full flex justify-center text-black text-sm cursor-pointer"
                      >
                        <button>Log In</button>
                      </div>
                      <div
                        onClick={() => setSelected(!selected)}
                        className="w-full flex justify-center text-black text-sm cursor-pointer"
                      >
                        <button>Sign Up</button>
                      </div>
                    </div>
                    <span
                      className={`bg-sky-500 shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute ${
                        selected
                          ? "left-1 text-white"
                          : "left-1/2 -ml-1 text-white"
                      }`}
                      children={selected ? "Log In" : "Sign Up"}
                    />
                  </div>
                </div>
              </div>
              {/* switching */}
              {selected ? (
                <>
                  <p className="w-full text-2xl font-medium leading-snug font-sans">
                    User Log In
                  </p>
                  <div className="w-full mt-2 relative space-y-4">
                    <div className="relative">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email Address"
                        type="email"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-3 mt-2  text-sm block bg-white border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative bg-opacity-80">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        type="password"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-3 mt-2 text-sm block bg-white border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <button
                        onClick={submitHandler}
                        className="w-full inline-block px-4 py-2 mt-6 text-lg font-medium text-center text-white bg-sky-500 rounded-lg transition duration-200 hover:bg-sky-600 ease"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <p className="w-full text-2xl font-medium leading-snug font-sans">
                    Create Your Account
                  </p>
                  <div className="w-full mt-2 relative space-y-4">
                    <div className="relative">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Company Name"
                        type="text"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-3 mt-2  text-sm block bg-white border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email Address"
                        type="email"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-3 mt-2  text-sm block bg-white border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative bg-opacity-80">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        type="password"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-3 mt-2 text-sm block bg-white border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative bg-opacity-80">
                      <input
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        placeholder="Re Enter Password"
                        type="password"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-3 mt-2  text-base block bg-white border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <button
                        onClick={submitHandler}
                        className="w-full inline-block px-4 py-2 mt-6 text-lg font-medium text-center text-white bg-sky-500 rounded-lg transition duration-200 hover:bg-sky-600 ease"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              )}
              {/* switching end */}
              {/* common element */}
              <div className="w-full mt-2 relative space-y-4">
                <div className="flex flex-row">
                  <hr className="border mt-2 w-full border-gray-400 flex-grow-1" />
                  <p className="px-2 text-xs font-bold text-gray-700">OR</p>
                  <hr className="border mt-2 w-full border-gray-400 flex-grow-1" />
                </div>
                <div className="items-center">
                  <p className="text-violet-600 text-center text-sm -mt-3">
                    Log In Using
                  </p>
                </div>

                <div className="w-full text-center bg">
                  <FacebookLogin
                    appId="644671207504669"
                    // autoLoad={true}
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <button onClick={renderProps.onClick}>
                        <button className="mr-2">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
                            // src="https://static.vecteezy.com/system/resources/previews/002/557/425/original/google-mail-icon-logo-isolated-on-transparent-background-free-vector.jpg"
                            alt="facebook"
                            border="0"
                            height="30rem"
                            width="40rem"
                          />
                        </button>
                      </button>
                    )}
                  />
                  {/* <button className="mr-2" onClick={signInWithFacebook}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
                      // src="https://static.vecteezy.com/system/resources/previews/002/557/425/original/google-mail-icon-logo-isolated-on-transparent-background-free-vector.jpg"
                      alt="facebook"
                      border="0"
                      height="30rem"
                      width="40rem"
                    />
                  </button> */}
                  <button className="mr-2" onClick={signInWithGoogle}>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/016/716/465/non_2x/gmail-icon-free-png.png"
                      alt="email"
                      border="0"
                      height="30rem"
                      width="40rem"
                    />
                  </button>
                  {/* <button>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png"
                      alt="instagram"
                      border="0"
                      height="30rem"
                      width="40rem"
                    />
                  </button> */}
                  <InstagramLogin
                    clientId="2328024467361811"
                    buttonText="Login"
                    onSuccess={responseInstagram}
                    onFailure={responseInstagram}
                    render={(renderProps) => (
                      <button onClick={renderProps.onClick}>
                        <button>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png"
                            alt="instagram"
                            border="0"
                            height="30rem"
                            width="40rem"
                          />
                        </button>
                      </button>
                    )}
                  />
                </div>
              </div>
              {/* common element end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
