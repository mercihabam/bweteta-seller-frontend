import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TypewriterComponent from 'typewriter-effect';
import './style.scss';

export function HomaPage(){
    const history = useHistory();

    useEffect(() =>{
        document.body.style.height = "100vh";
        document.body.style.overflowY = "hidden";
    })

    return(
        <div className="home">
            <div className="intro">
                <div className="home-logo"></div>
                <div className="line"></div>
                <div className="intro-head">Bweteta seller</div>
                <div className="intro-hr"></div>
                <div className="intro-content">
                <TypewriterComponent
                    options={{
                        strings: "Gerer votre commerce en ligne",
                        autoStart: true,
                        loop: true,
                        pauseFor: 3000
                    }}
                    />
                    <div className="intro-btn">
                        <button onClick={() =>history.push("/login")} >Commencer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}