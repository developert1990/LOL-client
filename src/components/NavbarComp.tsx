import React, { ChangeEvent } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { changeRegion } from '../actions/regionAction';
import logo from '../images/cat.png';
import { SearchPage } from '../pages';

export const NavbarComp = () => {

    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedRegion = e.target.value;
        console.log('selectedRegion ==> ', selectedRegion);
        dispatch(changeRegion(selectedRegion))
    }

    return (
        <div className="navbarComp">
            <Navbar variant="dark">
                <Link className="link" to="/"><img src={logo} style={{ width: "30px", height: "40px", marginRight: "20px" }} alt="cat" />H.gg</Link>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className="link" to="/search">
                            <li>Search</li>
                        </Link>
                        <Link className="link" to="/champions">
                            <li>Champions</li>
                        </Link>
                        <Link className="link" to="/ranks">
                            <li>Ranks</li>
                        </Link>
                    </Nav>
                    <Nav className="ml-auto" style={{ width: "400px" }}>
                        <SearchPage />
                    </Nav>
                    <Nav>
                        <select className="select-region" onChange={handleChange}>
                            <option value="" className="">Select Region</option>
                            <option value="na1" className="na1">North America</option>
                            <option value="kr">Korea</option>
                            <option value="jp1">Japan</option>
                            <option value="euw1">Europe West</option>
                            <option value="eun1">Europe Nordic East</option>
                            <option value="oc1">Oceania</option>
                            <option value="br1">Brazil</option>
                            <option value="ru">Russia</option>
                            <option value="tr1">Turkey</option>
                            <option value="la1">Latin North</option>
                            <option value="la2">Latin South</option>
                        </select>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
