import axios from "axios";
import { fetchAdminError, fetchedAdminData, fetchedHomeData, fetchHomeError, fetchingAdminData, fetchingHomeData, } from "../features/homeSlice"


export const getAllHouseData = (url) => {
  return async (dispatch) => {
    dispatch(fetchingHomeData());
    try {
      const res = await axios.get(url);
      dispatch(fetchedHomeData(res.data));

    } catch (err) {
      dispatch(fetchHomeError(err.message));
      console.log(err.message);
    }
  };
};
export const getAllAdminData = (url) => {
  return async (dispatch) => {
    dispatch(fetchingAdminData());
    try {
      const res = await axios.get(url);
      dispatch(fetchedAdminData(res.data));
      console.log(res.data);


    } catch (err) {
      dispatch(fetchAdminError(err.message));
      console.log(err.message);
    }
  };
};
