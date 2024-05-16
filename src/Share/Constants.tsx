import { CSGLogo, anonymousImg } from "./Data/CSGLogo";

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
        export: 'export' //Export Data
    },
    topNavHeight: 47, //px
    unLoggedInMaximumScroll: 50, //px
    webUrl: 'https://eco.cocsaigon.club',
    postImageCrop: {
        minWidth: 150, //px
        ratio: 1, // 1:1
        maxRatio: 2,
    },
    postOption: {
        anonyImgUrl: anonymousImg,
        anonyName: 'Người dùng ECO',
    },
    numberOfPostPerReq: 15,
}