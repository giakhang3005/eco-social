import { useEffect, useState } from "react";
import "./SkeletonPosts.scss"

type Props = {
    eleRef: any,
    numberOfSkeleton?: number,
}

const SkeletonPosts = ({ eleRef, numberOfSkeleton = 3 }: Props) => {
    const arrNum = Array(numberOfSkeleton).fill(0);

    const [postContainerWidth, setPostContainerWidth] = useState<number>(0);

    useEffect(() => {
        const element = eleRef.current;

        if (element) {
            setPostContainerWidth(element.clientWidth);
        }
    })
    return (
        <>
            {
                arrNum?.map((data: any, i: number) => (
                    <div key={i} className="skeletonCover" style={{ height: `${postContainerWidth / 3}px` }}>
                        <div className="shine"></div>
                    </div>
                ))
            }

        </>
    )
}

export default SkeletonPosts