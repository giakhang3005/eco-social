import "./SkeletonPosts.scss"

type Props = {
    postContainerWidth: number,
    numberOfSkeleton?: number,
}

const SkeletonPosts = ({ postContainerWidth, numberOfSkeleton = 3 }: Props) => {
    const arrNum = Array(numberOfSkeleton).fill(0);
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