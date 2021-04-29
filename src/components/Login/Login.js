import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import { FaBeer, FaGoogle } from 'react-icons/fa';

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: ''
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var { displayName, photoURL, email } = result.user;

                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);

                // console.log(email);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        // console.log(e.target.name, e.target.value);
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            console.log(isFieldValid);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passWordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = (isPasswordValid && passWordHasNumber);
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            console.log(user);
        }
    }

    const handleSubmit = (e) => {
        console.log(user);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    // var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    console.log(user.name);
                    updateUserName(user.name);
                    // ...
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(errorCode, errorMessage);
                    // ..
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    console.log("sucessfully login");
                    history.replace(from);
                    console.log("sign in user info", userCredential.user);
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("user name update successfully");
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <div >

            <div className="login">

                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sign Up</label>

                {/* <form onSubmit={handleSubmit}>
                {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your Name"  className="form-control"/>}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Write your Email Address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form> */}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your Name" className="form-control" />}
                    </div>

                    <div className="form-group">
                        <input type="text" name="email" onBlur={handleBlur} placeholder="Write your Email Address" className="form-control" required />
                    </div>

                    <div className="form-group">
                    <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" className="form-control" required />
                
                    </div>

                    <div className="form-group">
                    <input className="form-control btn-danger" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                
                    </div>

                </form>


                <button onClick={() => handleLogin()} className="form-control"><FaGoogle/> Sign In Google</button>

                <p style={{ color: 'red' }}>{user.error}</p>

                {
                    user.isSignedIn && <p>Email: {user.name}</p>
                }
            </div>
        </div>
    );
};

export default Login;