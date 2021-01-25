import React from 'react';
import { Footer, NavbarComp } from '../components/index';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage, SearchPage } from '../pages/index'


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <BrowserRouter>
            <NavbarComp />
            <div className="components-wrap">
                <div className="logo-img">
                    <img src="images/lol-logo.png" alt="main-logo-img" />
                </div>
                <Route path="/" component={MainPage} exact />
                <Route path="/search" component={SearchPage} />
            </div>
            <Footer />
        </BrowserRouter>
    )
}