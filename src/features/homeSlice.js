import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  AdminData: [],
  isAdminLoad: false,
  isAdminError: false,
  homeData: [],
  isHomeLoad: false,
  isHomeError: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    fetchingHomeData: (state) => {
      state.isHomeLoad = true;
    },
    fetchedHomeData: (state, action) => {
      state.isHomeLoad = false;
      state.homeData = action.payload;
    },
    fetchHomeError: (state, action) => {
      state.isHomeLoad = false;
      state.isHomeError = action.payload;
    },
    fetchingAdminData: (state) => {
      state.isAdminLoad = true;
    },
    fetchedAdminData: (state, action) => {
      state.isAdminLoad = false;
      state.AdminData = action.payload;
    },
    fetchAdminError: (state, action) => {
      state.isAdminLoad = false;
      state.isAdminError = action.payload;
    },
  },

});

export const { fetchingHomeData, fetchedHomeData, fetchHomeError, fetchAdminError, fetchedAdminData, fetchingAdminData } = homeSlice.actions;
export default homeSlice.reducer;
