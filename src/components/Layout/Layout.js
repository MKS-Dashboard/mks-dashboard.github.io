import React from 'react';
import "./Layout.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <div className="app-wrapper">
            <Header headerTitle={props.title} />
            {props.children}
            <div className="footer-wrapper">
                <Footer />
            </div>

        </div>
    );
};

export default Layout;