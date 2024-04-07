
export const GlobalConstants = {
    localStorageKeys: {
        user: 'user',
        theme: 'theme'
    },
    permissionsKey: {
        points: 'points', // add, subtract points
        approval: 'approval', // approve posts
        log: 'log', // view points, approval, booth update log
        booth: 'booth', // Update status of booth (finished/not yet)
    },
    topNavHeight: 47, //px
    unLoggedInMaximumScroll: 47, //px
    webUrl: 'https://eco-social.vercel.app',
    postImageCrop: {
        minWidth: 150, //px
        ratio: 1, // 1:1
        maxRatio: 2,
    }
}