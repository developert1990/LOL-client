import React from 'react'
import { API_BASE } from '../config'

export const MainPage = () => {
    console.log('서버 연결', process.env.NODE_ENV)
    console.log('API_BASE: ????', API_BASE)

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
