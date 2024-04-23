import { useEffect, useState } from "react"
import "./Challenges.scss"
import { challenges } from "../../Share/Data/ChallengesData";

const Challenges = () => {
    const [challenge, setChallenge] = useState<{ challenge: string, date: number, month: number } | undefined>(undefined);

    useEffect(() => {
        updateChallenge();

        const checkChallengeInterval = setInterval(() => {
            updateChallenge();
        }, 1000 * 60 * 10);

        return () => clearInterval(checkChallengeInterval);
    }, []);

    const updateChallenge = () => {
        const today = new Date();

        if (challenge && (challenge.date === today.getDate() && challenge.month === today.getMonth() + 1)) return;

        const todayChallenge = challenges.find((item) => item.date === today.getDate() && item.month === today.getMonth() + 1);

        if (todayChallenge) {
            setChallenge(todayChallenge);
        } else {
            setChallenge(undefined);
        }
    }

    return (
        <>
            {
                challenge &&
                <div className="challenges">
                    <div className="title">Thử thách hôm nay {challenge?.date}/{challenge?.month}/2024</div>
                    <div className="todayChallenge">
                        <b style={{ color: 'var(--error-color)' }}>Chụp và đăng ảnh</b> {challenge?.challenge}
                    </div>
                </div>
            }
        </>

    )
}

export default Challenges