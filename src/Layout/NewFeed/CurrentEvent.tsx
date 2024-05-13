import React, { useEffect, useState } from 'react'

type Props = {
    act: any;
    viewEventDetail: any;
}

const CurrentEvent = ({ act, viewEventDetail }: Props) => {
    const [time, setTime] = useState<any>();

    useEffect(() => {
        const convertTimeInterval = setInterval(() => {
            if (time === 'Đã kết thúc') {
                clearInterval(convertTimeInterval);
                return;
            }
            
            convertTime();
        }, 1000);

        return () => clearInterval(convertTimeInterval);
    }, []);

    const calculateDiffrenceInTime = (time1: any, time2: any) => {
        // Calculate the difference in milliseconds
        const difference = Math.abs(time1 - time2);

        // Calculate the difference in days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds }
    }

    const convertTime = () => {
        const now = new Date().getTime();
        const start = new Date(act.time?.start).getTime();
        const end = new Date(act.time?.end).getTime();

        const { days, hours, minutes, seconds } = calculateDiffrenceInTime(now, start);

        if (days > 0 && now < start) {
            setTime(`Còn ${days} ngày ${hours} giờ`);
            return;
        }

        if (days === 0 && hours > 0 && now < start) {
            setTime(`Còn ${hours} giờ ${minutes} phút`);
            return;
        }

        if (days === 0 && hours === 0 && minutes > 0 && now < start) {
            setTime(`Còn ${minutes} phút ${seconds} giây`);
            return;
        }

        if (start <= now && now <= end) {
            setTime(`Đang diễn ra`);
            return;
        }

        setTime('Đã kết thúc');
    }

    return (
        <div className="bannerImg">
            <img src={act.img} />
            <div className='countdown'>{time}</div>
            <button className="moreBtn" onClick={() => viewEventDetail(act)}>Xem chi tiết</button>
        </div>
    )
}

export default CurrentEvent