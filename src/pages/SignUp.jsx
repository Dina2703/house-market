import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password, name } = formData;

  /*[e.target.id]: e.target.value  - in this line [e.target.id] will change based on a id attribute of input where it belongs(password or email, ), then the e.target.value -- will be set  respectively. for id='email', its value becomes what triggers onChange() of input for email, same for id=password*/

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      //Save user to Firestore

      const formDataCopy = { ...formData }; //make a copy of the formData obj.
      delete formDataCopy.password; //to remove the password property from formDataCopy object, we don't want user password put  into database.
      formDataCopy.timestamp = serverTimestamp(); //add timestamp property to the formDataCopy obj.

      await setDoc(doc(db, "users", user.uid), formDataCopy); //setDoc() updates the database and adds our user to the users collection. 'users' we-re defining a collection name, user.uid - adds id for each user. The second argument is the 'formDataCopy' info about the user to be added.

      navigate("/");
      console.log(auth);
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="passwordInput"
                id="password"
                value={password}
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setshowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/*Google OAth */}
          <Link to="/sign-in" className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
