import axios from 'axios';

export  const api = () => {
    return axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            authorization: getToken()
        }
    })
};

export const getToken = () => {
    return localStorage.getItem('token')
}