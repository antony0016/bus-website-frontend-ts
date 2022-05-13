import axios from "axios";

const config = {
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Air/'
}

export default axios.create(config)
