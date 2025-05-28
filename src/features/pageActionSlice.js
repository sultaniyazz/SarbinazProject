import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: false,
  showLoginModal: false,
  showSignUpModal: false,
  darkMode: false,
  langChange: false,
};

const pageActionSlice = createSlice({
  name: "pageAction",
  initialState,
  reducers: {
    modal: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    showLoginModal: (state) => {
      state.showLoginModal = !state.showLoginModal;
    },
    showSignUpModal: (state) => {
      state.showSignUpModal = !state.showSignUpModal;
    },
    mode: (state) => {
      state.darkMode = !state.darkMode;
    },
    lang: (state) => {
      state.langChange = !state.langChange;
    },
  },
});

export const { modal, mode, lang, showLoginModal, showSignUpModal } = pageActionSlice.actions;
export default pageActionSlice.reducer;
