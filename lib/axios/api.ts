import axios from "axios";
import { makeMsUrl } from "@/constants";

const baseApiClient = axios.create({
    baseURL: makeMsUrl(""),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})


export default baseApiClient