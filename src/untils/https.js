
/* eslint-disable */
import axios from 'axios'

// 請求攔截
axios.interceptors.request.use(
    (confing) => {
        //設定請求頭
        if (localStorage.eToken) {
            confing.headers.Authorization = localStorage.eToken
        }

        return confing
    },
    (error) => {
        return Promise.reject(error)
    }
)

//響應攔截

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // this.$bus.$on("ErrorTip",error.response.data)
        // Message.error(error.response.data)
        // endLoading()

        // 獲取狀態碼
        const { status } = error.response

        if (status === 401) {
            localStorage.removeItem('eToken')
        }
        return Promise.reject(error)
    }
)
export default axios