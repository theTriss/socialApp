import axios from 'axios';

const axiosInstanse = axios.create({
    headers: {
        "API-KEY": "665a2e27-a3f2-40a2-94ed-eefa9d2ec251"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
})

export const userAPI = {
    getUsers(currentPage = 1, usersLimit = 10, search = '') {
        return axiosInstanse.get(`users?page=${currentPage}&count=${usersLimit}&term=${search}`)
            .then(response => response.data)
    },
    followUser(id) {
        return axiosInstanse.post(`follow/${id}`, {})
    },
    unfollowUser(id) {
        return axiosInstanse.delete(`follow/${id}`)
    }
}

export const authAPI = {
    getAuth() {
        return axiosInstanse.get(`auth/me`);
    },
    logIn({ email, password, rememberMe, captcha }) {
        return axiosInstanse.post(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logOut() {
        return axiosInstanse.delete(`auth/login`)
    },
    getCaptcha() {
        return axiosInstanse.get(`security/get-captcha-url`)
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return axiosInstanse.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return axiosInstanse.get(`profile/status/${userId}`)
    },
    changeStatus(status) {
        return axiosInstanse.put(`profile/status`, {
            status
        })
    },
    editProfile( { aboutMe, facebook, github, instagram, mainLink, twitter, vk,
                   website, youtube, lookingForAJob, lookingForAJobDescription, fullName } ) {
        return axiosInstanse.put(`profile`, {
            aboutMe,
            contacts: {
                facebook,
                github,
                instagram,
                mainLink,
                twitter,
                vk,
                website,
                youtube
            },
            lookingForAJob,
            lookingForAJobDescription,
            fullName
        })
    },
    setPhoto(formData){
        return axiosInstanse.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }
}

export const dialogsAPI = {
    getAllDialogs(){
        return axiosInstanse.get(`dialogs`);
    },
    getMessages(id){
        return axiosInstanse.get(`dialogs/${id}/messages`);
    },
    deleteMessage(id){
        return axiosInstanse.delete(`dialogs/messages/${id}`);
    },
    restoreMessage(id){
        return axiosInstanse.put(`dialogs/messages/${id}/restore`, {});
    },
    sendMessage(id, body){
        return axiosInstanse.post(`dialogs/${id}/messages`, {body})
    },
    messageOnTop(id){
        return axiosInstanse.put(`dialogs/${id}`, {})
    } 
}

export const newsAPI = {
    getNews(q = '', country = 'ua', category = 'sports', page = 1) {
        return axios.get(`https://newsapi.org/v2/top-headlines?q=${q}&country=${country}&page=${page}&category=${category}&apiKey=ce0e27932ee24f82b18293836bb9ec29`);
    }
}

export const musicAPI = {
    getTracks(url) {
        return axios.get(`${url}`)
    }
}