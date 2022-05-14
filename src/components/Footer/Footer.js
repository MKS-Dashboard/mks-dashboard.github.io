import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <p className="footer-text">
                © Copyright 2021 {new Date.getYear()} | MKS-Dashboard | <img src="https://tokei.rs/b1/github/MKS-Dashboard/mks-dashboard.github.io" alt='SLOC'></img> | <a href="/voorwaarden">Algemene Voorwaarden</a> en <a href="/privacy">Privacyverklaring</a>
            </p>
        </div>
    );
};

export default Footer;
