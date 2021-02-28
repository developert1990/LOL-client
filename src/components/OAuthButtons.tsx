import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import { GoogleOAuth_Profile_Type } from '../types';
import { useHistory } from 'react-router-dom';
import { register } from '../actions/userAction';


export const OAuthButtons = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // firebase 사용해서 google, facebook, github login 구현
    const logInClick = (e: any) => {
        const clicked = e.target.getAttribute('name');
        if (clicked === 'google') {
            console.log("구글로그인으로 들어오모")
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                console.log("리절트 ==> ", result);
                const { user, additionalUserInfo } = result;
                const typedAdditionalUserInfo = additionalUserInfo?.profile as GoogleOAuth_Profile_Type;

                if (additionalUserInfo && additionalUserInfo.profile && user) {
                    dispatch(register(typedAdditionalUserInfo.given_name, typedAdditionalUserInfo.email, user?.uid));
                    // loginAuth(result);
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'facebook') {
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // console.log(result);
                loginAuth(result);
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'github') {
            const provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // console.log(result);
                loginAuth(result);
                console.log('sjadsfa')
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'twitter') {
            const provider = new firebase.auth.TwitterAuthProvider();
            // console.log(provider);
            firebase.auth().signInWithPopup(provider).then(function (result) {

                loginAuth(result);
            }).catch(function (error) {
                console.log('error', error);
            });
        }
    }



    const loginAuth = (result: any) => {
        // console.log('result.credential.providerId', result.credential.providerId)
        switch (result.credential.providerId) {
            case "google.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    uid: result.user.uid,
                    providerId: result.credential.providerId,
                    profile: result.additionalUserInfo.profile,

                }));
                history.push('/browse');
                break;
            case "facebook.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    email: result.email,
                    providerId: result.credential.providerId,
                    profile: null,

                }));
                history.push('/browse');
                break;
            case "github.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    email: result.email,
                    providerId: result.credential.providerId,
                    profile: null,
                }));
                history.push('/browse');
                break;
            case "twitter.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    email: result.email,
                    providerId: result.credential.providerId,
                    profile: result.additionalUserInfo.profile,

                }));
                history.push('/browse');
                break;
            default:
                break;
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
