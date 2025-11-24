import { toast } from "react-toastify";
import { url } from "../utils/url";
/**
 * check status of API and if status code is not right than handle the exception
 * @author Sadik
 * @param {*} response
 * @returns {response}
 */
const checkStatus = async (response) => {
  if (response.status >= 400 && response.status < 600) {
    console.warn("API error:", response);
    // const responseBody = await response.json().catch(() => ({}))
  }
  if (
    response.contentType &&
    response.contentType.indexOf("application/json") !== -1
  ) {
    console.warn(
      `Incorrect contentType; expected: application/json, actual: ${response.contentType}`,
    );
  }
  return response;
};
/**
 * format api request before it send with headers, token and url
 * @author Sadik
 * @param {*} param
 * @returns
 */
const sendRequest = ({
  method = "GET",
  endpoint,
  data,
  queryParam = null,
  headers = {},
  usingAuthToken = true,
  rawBody = false,
}) => {
  let url = `${process.env.NEXT_PUBLIC_APP_NAME}${endpoint}`; // change the url with the env value
  const params = {
    method,
    headers,
  };
  if (Object.keys(headers).length === 0) {
    params.headers["Content-Type"] = "application/json";
    params.headers["Access-Control-Allow-Origin"] = "*"; // TODO: need to check this it can't be *
    params.headers["Accept"] = "application/json"; // TODO: need to check this it can't be *
    params.headers["Accept"] = "application/json"; // TODO: need to check this it can't be *
  }
  // by defauly usingAuthToken for most of the API call but for some API which doesn't need it will skip it
  if (usingAuthToken) {
    const token =
      localStorage.getItem("userInfo") !== null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : false;
    if (token) {
      params.headers.Authorization = `Bearer ${token?.body.winspectSMEtoolkit.accessToken}`;
    }
  }
  // Set the body for the requests except for GET.
  if (data && method !== "GET") {
    params.body = rawBody ? data : JSON.stringify(data);
  }
  // If query paramter is there than encode that
  if (queryParam !== null) {
    url += encodeURI(queryParam);
  }
  return fetch(url, params);
};

/**
 * General function for unified call of API with proper response handling
 * @author Sadik
 * @param {*} params
 * @returns {JSON}
 */
const callApi = async (params) => {
  let result = await sendRequest(params).then((resp) =>
    resp
      .json()
      .catch((error) => {
        console.warn("Response from API wasn't JSON serializable", error);
        return false;
      })
      .then(checkStatus)
      .then(async (response) => {
        if (response.error?.code === "NOT_AUTHORIZED") {
          localStorage.removeItem("userInfo");
          toast.error("Session expired, please login again");
          params?.router?.push(url.login);
        } else if (response.status == 400 || response.status == 404) {
          toast.error(response.message);
        }
        return response;
      }),
  );
  if (params.showNotification && result.status == 200) {
    toast.success(result.message);
  }
  return result;
};
export default callApi;
