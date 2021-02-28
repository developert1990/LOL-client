import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { register } from '../actions/userAction';
import { Loading } from '../components/Loading';
import { MessageBox } from '../components/MessageBox';
import { initialAppStateType } from '../store';

export const SignUpPage = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const redirect = location.search ? location.search.split("=")[1] : '/';
    const userRegister = useSelector((state: initialAppStateType) => state.registerStore);
    const { userInfo, error, loading } = userRegister;

    // 여기서 지금 nav에서 log out했을 때 userInfo 정보가 남아있어서 자꾸 redirect path 가 / 이렇게 된다.
    useEffect(() => {

        console.log('userInfo:___', userInfo)
        if (userInfo) {
            console.log('redirect:___', redirect)
            history.push(redirect);
        }
    }, [userInfo, redirect, history])




    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('');
    const isInvalid = name === '' || password === '' || email === '' || confirmPassword === '';

    const handleSignup = () => {
        if (password !== confirmPassword) {
            setPasswordConfirmError('Please Enter the same password');
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <>
            <div className="signup">
                <div className="form">
                    <h1 className="form__title">Sign Up</h1>
                    {loading && <Loading />}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}

                    <div className="form__base">
                        <input className="form__input"
                            placeholder="First Name"
                            value={name}
                            onChange={({ target }) => setName(target.value)} />
                        <input className="form__input"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)} />
                        <input className="form__input"
                            type="password"
                            value={password}
                            autoComplete="off"
                            placeholder="Password"
                            onChange={({ target }) => setPassword(target.value)} />
                        <input className="form__input"
                            type="password"
                            value={confirmPassword}
                            autoComplete="off"
                            placeholder="Confirm Password"
                            onChange={({ target }) => setConfirmPassword(target.value)} />
                        {passwordConfirmError}
                        <button className="form__submit" disabled={isInvalid} onClick={handleSignup} type="submit">
                            Sign Up
                    </button>
                        <div>
                            Already have an account?{''}
                            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
