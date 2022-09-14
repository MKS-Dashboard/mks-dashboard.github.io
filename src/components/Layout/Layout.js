import React from 'react';
import "./Layout.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    const getReturnValues = (secsLeft) => {
        const minutes = Math.floor((secsLeft / 60));
        const seconds = secsLeft % 60;

        return [minutes, seconds];
    };

    return (
        <div className="app-wrapper">
            <Header loggedIn={props.loggedIn} />
            {(() => {
                if (props.countdownGoal > 0) {
                    return (
                        <div hidden={!props.loggedIn} id="timer">
                            Verwachte data refresh in: {(() => {
                                let [minutes, seconds] = getReturnValues(props.countdownGoal)
                                return (`${minutes > 9 ? minutes : `0` + minutes}:${seconds > 9 ? seconds : `0` + seconds}`)
                            })()}
                        </div>
                    )
                }
            })()}

            {props.children}
            <div className="footer-wrapper">
                <Footer />
            </div>

        </div>
    );
};

export default Layout;
