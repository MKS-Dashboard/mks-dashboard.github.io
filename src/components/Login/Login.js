import React from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {

    var input = window.location.href.split("/").pop();
    props.setInputValue(input);
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div id="Container">
            <label>
                <input type="checkbox"
                    defaultChecked={props.agree}
                    onChange={() => props.setAgree(!props.agree)}
                />
                Ik ga akkoord met de <a href="/voorwaarden">Algemene Voorwaarden</a> en <a href="/privacy">Privacyverklaring</a>
            </label>
            <br /><br />
            Uw SessionID van <a href="https://meldkamerspel.com">Meldkamerspel.com</a>:<br />
            <input name='sessionId' type='password' value={props.template} onChange={e => props.setInputValue(e.target.value)} disabled={!props.agree} />
            <input name='submit' type='submit' value='Gegevens ophalen' onClick={() => { props.GetData(); navigateToHome() }} disabled={!props.agree} />

        </div>
    )
}

export default Login