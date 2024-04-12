
export const GlobalConstants = {
    localStorageKeys: {
        user: 'user',
        theme: 'theme',
        tempPost: 'tempPost',
    },
    sessionStorageKeys : {
        isCreateNewPost: 'isCreateNewPost',
        postsYDistance: 'postsYDistance',
    },
    permissionsKey: {
        points: 'points', // add, subtract points
        approval: 'approval', // approve posts
        log: 'log', // view points, approval, booth update log
        booth: 'booth', // Update status of booth (finished/not yet)
        perm: 'perm', // Manage perms
    },
    topNavHeight: 47, //px
    unLoggedInMaximumScroll: 50, //px
    webUrl: 'https://eco-social.vercel.app',
    postImageCrop: {
        minWidth: 150, //px
        ratio: 1, // 1:1
        maxRatio: 2,
    },
    postOption: {
        anonyImgUrl: 'https://previews.123rf.com/images/nadianb/nadianb1709/nadianb170900256/86443804-idyllic-landscape-in-mountains-rural-scene-beautiful-nature-image-toned-square.jpg',
        anonyName: 'Người dùng ECO',
    },
    numberOfPostPerReq: 15,
}