import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface NavbarAdminPropsType {
    signoutHandler: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void)
}

export const NavbarAdmin: React.FC<NavbarAdminPropsType> = ({ signoutHandler }) => {
    return (
        <>
            <NavDropdown className="dropdown__Parent" title="Admin" id="basic-nav-dropdown">
                <div className="dropdown-content">
                    <NavDropdown.Item><Link to="/dashboard">Dashboard</Link> </NavDropdown.Item>
                    <NavDropdown.Item><Link to="/productList">Products</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/orderList">Orders</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/userList">Users</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></NavDropdown.Item>
                </div>
            </NavDropdown>

        </>
    )
}
