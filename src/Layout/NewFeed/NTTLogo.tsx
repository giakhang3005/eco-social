import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../Layout';
import { IContext } from '../../Model/Others';

type Props = {
    rootObj: any;
    scaleLight?: number;
    scaleDark?: number;
    style?: any;
}

const imgRootUrl = './Assets/Logo/NTT/';

const NTTLogo = ({ rootObj, scaleLight = 1, scaleDark = 1, style = {} }: Props) => {
    const { currentTheme } = useContext(Data) as IContext;

    const [imgLoaded, setImgLoaded] = useState<boolean>(false);

    useEffect(() => {
        setImgLoaded(false);
    }, [currentTheme]);


    return (
        <>
            {
                currentTheme === 'dark'
                    ? <img draggable={false} style={{ scale: `${scaleDark}`, margin: '0 1vw 0 1vw', ...style }} src={rootObj.white} />
                    : <img draggable={false} style={{ scale: `${scaleLight}`, margin: '0 1vw 0 1vw', ...style }} src={rootObj.black} />
            }
        </>
    )
}

export default NTTLogo