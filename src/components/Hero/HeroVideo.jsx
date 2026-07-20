import React from 'react';
import STUDIO_CONFIG from "../../config/studio";
import GLOBAL_STYLES from "../../styles/global";


const VideoComponent = ({url}) => {

    return (
        <video className="absolute inset-0 w-full h-full object-cover" src={url} autoPlay muted loop playsInline/>
    )
}

export default VideoComponent;