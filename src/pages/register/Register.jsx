import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_, setPassword_] = useState("");

  const [err, setErr] = useState("");
  // const [username, setUsername] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  // const usernameRef = useRef();

  const handleSubmit = (e) => {
    console.log("submit", email, password);
  };

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    // setUsername(usernameRef.current.value);
    try {
      await axios.post("https://dev.theotters.net/auth/signup", {
        email,
        password: password_,
      });
      history.push("/login");
      setErr(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://connectthefrontend.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20220713_155413115.png"
            alt=""
          />
          <button
            className="loginButton"
            onClick={(e) => {
              console.log(e);
              history.push("/login");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!err ? (
          <p className="listTitleWarning">
            {" "}
            Already registered? Check your inbox.{" "}
          </p>
        ) : null}
        {err ? <p className="listTitleWarning">{err}</p> : null}

        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input" onSubmit={handleSubmit}>
            {/* <input type="username" placeholder="username" ref={usernameRef} /> */}
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              onChange={(e) => {
                setPassword_(e.target.value);
              }}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
