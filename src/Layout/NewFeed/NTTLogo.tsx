import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../Layout';
import { IContext } from '../../Model/Others';

type Props = {
    rootObj: any;
    scaleLight?: number;
    scaleDark?: number;
}

const imgRootUrl = './Assets/Logo/NTT/';

const NTTLogo = ({ rootObj, scaleLight = 1,  scaleDark = 1}: Props) => {
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
                ? <img style={{ scale: `${scaleDark}` }} src={rootObj?.white} />
                : <img style={{ scale: `${scaleLight}`  }} src={rootObj?.black} onLoad={handleFinishLoadedImg} />
            }
        </>
    )
}

export default NTTLogo