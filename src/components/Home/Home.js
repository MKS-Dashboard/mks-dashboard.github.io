import React from 'react'
import { HiInformationCircle } from "react-icons/hi";

const Home = (props) => {

    return (
        <div id="Container">
            Welkom in het mks-dashboard.<br />
            <br />
            Op deze pagina kun je verschillende gegevens over meldkamerspel vinden.<br />
            Momenteel zijn wij nog bezig met de ontwikkeling hierdoor is het mogelijk dat niet alles werkt zoals het zou moeten.
            En zijn er weinig opties beschikbaar.<br />
            Wanneer meer functies beschikbaar komen ze op deze site.
            <br />
            <br />

            <label>
                <input type="checkbox"
                    defaultChecked={props.agree}
                    onChange={() => props.setAgree(!props.agree)}
                />
                Ik ga akkoord met de <a href="/voorwaarden">Algemene Voorwaarden</a> en <a href="/privacy">Privacyverklaring</a>
            </label>
            <br /><br />
            Uw SessionID van <a href="https://meldkamerspel.com">Meldkamerspel.com</a>:<HiInformationCircle size={15} title={`F12(element inspecteren) --> Application --> Cookies`} /><br />
            <input name='sessionId' type='password' value={props.template} onChange={e => props.setInputValue(e.target.value)} disabled={!props.agree} />
            <input name='submit' type='submit' value='Gegevens ophalen' onClick={() => props.GetData()} disabled={!props.agree} />

            <br />

        </div >
    )
}

export default Home
