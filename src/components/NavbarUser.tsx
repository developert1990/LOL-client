import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { initialAppStateType } from '../store';

interface NabarUserPropsType {
    signoutHandler: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void)
}


export const NavbarUser: React.FC<NabarUserPropsType> = ({ signoutHandler }) => {
    const { userInfo } = useSelector((state: initialAppStateType) => state.userStore);
    return (
        <>
            <NavDropdown className="dropdown__Parent" title={userInfo.name} id="collasible-nav-dropdown">
                <div className="dropdown-content">
                    <NavDropdown.Item><Link to="/profile">User Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/history">Order History</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></NavDropdown.Item>
                </div>
            </NavDropdown>
        </>
    )
}
