import React, {useEffect, useState} from "react";

import LaunchSelector from "../components/LaunchSelector"
import LaunchDetails from "../components/LaunchDetails";

const LaunchContainer = () => {

    const [launch, setLaunch] = useState({});
    const [selectedLaunchId, setSelectedLaunchId] = useState(1);
    const [loaded, setLoaded] = useState(false);

    const getLaunch = () => {
        fetch(`https://api.spacexdata.com/v3/launches/${selectedLaunchId}`)
        .then(res => res.json())
        .then(data => setLaunch(data))
        .then(() => setLoaded(true))
    }

    const incrementSelectedLaunch = () => {
        const nextLaunchId = selectedLaunchId + 1;
        if (nextLaunchId <= 110){
            setSelectedLaunchId(nextLaunchId);
        }
    }

    const decrementSelectedLaunch = () => {
        const previousLaunchId = selectedLaunchId - 1;
        if (previousLaunchId >= 1){
            setSelectedLaunchId(previousLaunchId);
        }
    }

    useEffect(() => {
        getLaunch();
    }, [selectedLaunchId])

    return (
        <>
            <h1>SpaceX Launches</h1>
            <LaunchSelector
                onSelectedLaunchIncrement={() =>
                incrementSelectedLaunch()}
                onSelectedLaunchDecrement={() =>
                decrementSelectedLaunch()}
            />
            <LaunchDetails 
                launch={launch}
                loaded={loaded}
            />
        </>
    )
}

export default LaunchContainer;