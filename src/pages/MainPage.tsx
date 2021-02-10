import React from 'react'

export const MainPage = () => {


    return (
        <div className="main-page">
            <div className="main-video">
                <video autoPlay muted className="video-player1" loop>
                    <source src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/en-us/production/en-us/static/hero-0632cbf2872c5cc0dffa93d2ae8a29e8.webm" type="video/webm"></source>
                </video>
                <video autoPlay muted className="video-player2" loop>
                    <source src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/en-us/production/en-us/static/hero-0632cbf2872c5cc0dffa93d2ae8a29e8.webm" type="video/webm"></source>
                </video>
            </div>
        </div>
    )
}
