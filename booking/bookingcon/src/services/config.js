import axios from "axios";
import { managerStorage } from "../common/utils/localstorage";
import { KEY_ACCESS_TOKEN } from "../common/constants";

const URL = "https://airbnbnew.cybersoft.edu.vn"

export const  axiosWithAuthen = axios.create({
    baseURL: URL,
    timeout:60*30*1000,
})

export const axiosWithOuthen = axios.create({
    baseURL: URL,
    timeout:60*30*1000,
})

axiosWithAuthen.interceptors.request.use((config)=>{
    config.headers.set(
        "Authorization",
        `Bearer ${managerStorage.get(KEY_ACCESS_TOKEN)}`

        
    )
    return config;
})