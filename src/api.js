import axios from "axios";
import StorageService from "./Services/StorageServices";
const accessToken = StorageService.get("token")
// console.log(accessToken);
const crmURL = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "x-access-token": accessToken,
    
  },
});

export default crmURL;
