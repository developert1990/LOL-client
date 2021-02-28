import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import { FaceBookOAuth_Profile_Type, GitHubOAuth_Profile_Type, GoogleOAuth_Profile_Type } from '../types';
// import { useHistory } from 'react-router-dom';
import { register } from '../actions/userAction';


export const OAuthButtons = () => {
    const dispatch = useDispatch();
    // const history = useHistory();

    // firebase 사용해서 google, facebook, github login 구현
    const logInClick = (e: any) => {
        const clicked = e.target.getAttribute('name');
        if (clicked === 'google') {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                console.log("리절트 ==> ", result);
                const { user, additionalUserInfo } = result;
                const typedAdditionalUserInfo = additionalUserInfo?.profile as GoogleOAuth_Profile_Type;
                dispatch(register(typedAdditionalUserInfo.given_name, typedAdditionalUserInfo.email, user?.uid as string));
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'facebook') {
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                console.log("리절트 ==> ", result);
                const { user, additionalUserInfo } = result;
                const typedAdditionalUserInfo = additionalUserInfo?.profile as FaceBookOAuth_Profile_Type;
                dispatch(register(typedAdditionalUserInfo.first_name, typedAdditionalUserInfo.email, user?.uid as string));
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'github') {
            const provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                const { additionalUserInfo, user } = result;
                const typedAdditionalUserInfo = additionalUserInfo?.profile as GitHubOAuth_Profile_Type;
                dispatch(register(typedAdditionalUserInfo.name || typedAdditionalUserInfo.login, user?.email as string, user?.uid as string))
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'twitter') {
            const provider = new firebase.auth.TwitterAuthProvider();
            // console.log(provider);
            firebase.auth().signInWithPopup(provider).then(function (result) {
            }).catch(function (error) {
                console.log('error', error);
            });
        }
    }


    return (
        <div className="otherways_login">
            <h4>You can access with</h4>
            <Button className="google__button" variant="outline-light" name="google" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-google"></i>Google Login</Button>
            <Button className="google__button" variant="outline-primary" name="facebook" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-facebook-square"></i>FaceBook Login</Button>
            <Button className="google__button" variant="outline-warning" name="github" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-github"></i>GitHub Login</Button>
            <Button className="google__button" variant="outline-info" name="twitter" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-twitter"></i>Twitter Login</Button>
        </div>
    )
}
