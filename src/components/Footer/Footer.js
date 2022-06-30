import React, { useState, useEffect } from 'react';
import "./Footer.css"
import axios from "axios"

const Footer = () => {

    const [LastUpdate, setLastUpdate] = useState(new Date(1, 1, 1))

    useEffect(() => {
        fetchLastUpdate()

        async function fetchLastUpdate() {
            const fetchUpdate = async () => {
                const result = await axios("https://api.github.com/repos/MKS-Dashboard/mks-dashboard.github.io/branches/gh-pages");
                console.log(result.data.commit.commit.author.date)
                return new Date(result.data.commit.commit.author.date);
            };
            fetchUpdate().then((r) => setLastUpdate(r));
        }
    }, []);

    return (
        <div className="footer">
            <p className="footer-text">
                © Copyright 2021 - {new Date().getFullYear()} | MKS-Dashboard | Versie: {LastUpdate.toLocaleString()} | <img src="https://tokei.rs/b1/github/MKS-Dashboard/mks-dashboard.github.io" alt='SLOC'></img> | <a href="/voorwaarden">Algemene Voorwaarden</a> en <a href="/privacy">Privacyverklaring</a>
            </p>
        </div>
    );
};

export default Footer;
