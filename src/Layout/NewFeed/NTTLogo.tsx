import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../Layout';
import { IContext } from '../../Model/Others';

type Props = {
    rootName: string;
    scaleLight?: number;
    scaleDark?: number;
}

const imgRootUrl = './Assets/Logo/NTT/';

const NTTLogo = ({ rootName, scaleLight = 1,  scaleDark = 1}: Props) => {
    const { currentTheme } = useContext(Data) as IContext;

    const [imgLoaded, setImgLoaded] = useState<boolean>(false);

    useEffect(() => {
        setImgLoaded(false);
    }, [currentTheme]);

    const handleFinishLoadedImg = () => {
        setImgLoaded(true)
    }

    return (
        <>
            {imgLoaded &&
                currentTheme === 'dark'
                ? <img style={{ scale: `${scaleDark}` }} src={`${imgRootUrl}${rootName}_white.png`} />
                : <img style={{ scale: `${scaleLight}`  }} src={`${imgRootUrl}${rootName}_black.png`} onLoad={handleFinishLoadedImg} />
            }
        </>
    )
}

export default NTTLogo