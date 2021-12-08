import React from 'react'

const Home = (props) => {

    return (
        <div id="Container">
            Welkom in het mks-dashboard.<br />
            <br />
            Op deze pagina kun je verschillende gegevens over meldkamerspel vinden.
            Momenteel zijn wij nog bezig met de ontwikkeling hierdoor is het mogelijk dat niet alles werkt zoals het zou moeten.
            En zijn er weinig opties beschikbaar.<br />
            Wanneer meer functies beschikbaar komen ze op deze site.
            <br />
            <br />

            <input name='sessionId' type='password' value={props.template} onChange={e => props.setInputValue(e.target.value)} />
            <input name='submit' type='submit' value='Gegevens ophalen' onClick={() => props.SaveSessionID()} />

            <br />

        </div >
    )
}

export default Home
