import React from 'react'

const Home = (props) => {
    return (
        <div>
            Welkom in het mks-dashboard.<br />
            <br />
            Op deze pagina kun je verschillende gegevens over meldkamerspel vinden.
            Momenteel zijn wij nog bezig met de ontwikkeling hierdoor is het mogelijk dat niet alles werkt zoals het zou moeten.
            En zijn er weinig opties beschikbaar.<br />
            Wanneer meer functies beschikbaar komen ze op deze site.
            <br />
            <br />

            {/* <input name='sessionId' type='text' onChange={e => props.setSessionId(e.target.value)} /> */}
        </div >
    )
}

export default Home
