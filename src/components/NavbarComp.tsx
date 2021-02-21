import React, { ChangeEvent, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { changeRegion } from '../actions/regionAction';
import logo from '../images/cat.png';
import { SearchPage } from '../pages';

export const NavbarComp = () => {

    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedRegion = e.target.value;
        dispatch(changeRegion(selectedRegion))
    }

    const toggleHandle = () => {
        setActive(!active);
    }

    const clickLink = () => {
        setActive(!active);
    }

    return (
        <div className="navbarComp">
            <Link className="link" to="/"><img src={logo} style={{ width: "30px", height: "$with_height40", marginRight: "$margin_padding20" }} alt="cat" />H.gg</Link>

            <nav className={`menus  ${active ? "active" : "inActive"}`}>
                <Link className="link" to="/search" onClick={() => clickLink()}>
                    <li>Search</li>
                </Link>
                <Link className="link" to="/champions" onClick={() => clickLink()}>
                    <li>Champions</li>
                </Link>
                <Link className="link" to="/rank" onClick={() => clickLink()}>
                    <li>Ranks</li>
                </Link>
            </nav>
            <div className="search_box">
                <SearchPage />
            </div>
            <div>
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
            </div>
            <Link to="#" className={`hamburger_link `} onClick={() => toggleHandle()}>
                <i className={`fas fa-bars hamburger_bar`}></i>
            </Link>



        </div>
    );
};
