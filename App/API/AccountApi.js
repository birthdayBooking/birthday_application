import axios from "axios";
import axiosApi from "./AxiosApi";

const AccountApi = {
  saveUser: async (user) => {
    try {
      const result = axiosApi.post("/accounts/", user);
      return result;
    } catch (error) {
      console.log("Error saving 2", error);
    }
  },
};

export default AccountApi;
