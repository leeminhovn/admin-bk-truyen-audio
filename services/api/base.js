import { getCookie, setCookie } from "@/utils/features/localStorage";
import axios from "axios";
import endpoints from "./endpoints";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // đánh dấu request đã được thử lại

//       try {
//         const refreshToken = getCookie("adminRefreshToken"); // lấy refreshToken từ nơi bạn lưu trữ
//         // Gọi API làm mới token ở đây
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}${endpoints.ADMIN_GET_RERESHTOKEN}`,
//           {
//             refreshToken,
//           }
//         );

//         // Lưu accessToken mới và tiếp tục request gốc với accessToken mới
//         const { accessToken } = response.data;
//         if (!accessToken) {
//           return Promise.reject();
//         }
//         setCookie("adminToken", accessToken); // lưu accessToken mới
//         instance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${accessToken}`; // cập nhật token trong headers
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`; // cập nhật token cho request gốc
//         return instance(originalRequest); // thực hiện lại request gốc với accessToken mới
//       } catch (refreshError) {
//         // Xử lý lỗi khi không thể làm mới token (ví dụ: refreshToken cũng đã hết hạn)
//         console.log("Không thể làm mới token:", refreshError);
//         // Redirect user to login page or handle accordingly
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

//  ==============================================
// 	config: option
// 	params = {
// 		email: userState?.userInfo?.email,
// 		page: page,
// 		typeQuery: 1,
// 	}
// 	option = {
// 		params,
// 		headers {
// 			'MyCustomHeader1': '1',
// 			'MyCustomHeader2': '2'
// 		}
// 	}
// 	option = {}
// ==============================================
export const get = async (endpoint, config) => {
  try {
    const finalParam = config || {};
    const res = await instance.get(endpoint, { ...finalParam });
    return res;
  } catch (err) {
    return err;
  }
};

//  ==============================================
// 	body = {
// 		email: email,
// 		password: password,
// 	}
// 	customInfo = {
// 		params: {
//     		mail, firstName;
// 		},
// 		headers {
// 			'MyCustomHeader1': '1',
// 			'MyCustomHeader2': '2'
// 		}
// 	}
// ==============================================

export const post = async (endpoint, body, customInfo) => {
  try {
    const finalParam = customInfo || {};
    const res = await instance.post(endpoint, body, {
      ...finalParam,
    });
    return res;
  } catch (err) {
    return err;
  }
};
