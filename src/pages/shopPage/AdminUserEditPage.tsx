import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Loading } from '../../components/Loading';
import { MessageBox } from '../../components/MessageBox';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userType } from '../../reducers/userReducer';
import { initialAppStateType } from '../../store';
import { userDetails, userUpdate } from '../../actions/userAction';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

interface AdminUserEditParamsType {
    id: string;
}


export const AdminUserEditPage = () => {
    const userDetailStore = useSelector((state: initialAppStateType) => state.userDetailStore);
    const { error, loading, user } = userDetailStore;

    const typedUser = user as userType;

    const userUpdateStore = useSelector((state: initialAppStateType) => state.userUpdateStore);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdateStore;

    console.log('user:  ', user)
    const param: AdminUserEditParamsType = useParams();
    const userId = param.id;
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        console.log('userId', userId);
        console.log('typedUser', typedUser);

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/Admin/userList');
        }
        if (!user) {
            console.log(`user 없어서 들어옴`, user)
            dispatch(userDetails(userId));
        } else {
            setName(typedUser.name);
            setEmail(typedUser.email);
            setIsAdmin(typedUser.isAdmin);
        }
    }, [dispatch, typedUser, user, userId, successUpdate, history])

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userUpdate({ _id: userId, name, email, isAdmin }));
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 className="form__title">Edit User '<span style={{ color: "#3273fa" }}>{name}</span>'</h1>
                    {loadingUpdate && <Loading />}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                </div>
                {
                    loading ? <Loading /> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            (

                                <div className="form__base">
                                    <div>
                                        <label htmlFor="name" className="form__text">Name</label>
                                        <input className="form__input" type="text" id="name" placeholder="Enter name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="form__text">Email</label>
                                        <input className="form__input" type="text" id="email" placeholder="Enter name" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="isAdmin" className="form__text">Is Admin</label>
                                        <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAdmin(e.target.checked)} />
                                    </div>
                                    <div>
                                        <Button variant="primary" type="submit">Update</Button>
                                    </div>
                                </div>

                            )
                }
            </form>
        </div>

    )
}
