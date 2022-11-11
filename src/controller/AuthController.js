import axios from "axios";
import { loginUrl } from "../constants/urls";

export const login = async (username, password) => {
  let result = null;
  const data = {
    phone_number: username,
    password: password,
  };
  const headers = {
    Accept: "application/json",
  };
  await axios
    .post(loginUrl, data, { headers })
    .then((response) => {
      result = response;
    })
    .catch((error) => {
      result = error.response.data.message;
    });
  return result;
};
