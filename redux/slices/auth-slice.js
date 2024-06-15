import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl, setAuthToken } from "../../config/axios-configuration";
//  import {
//   axiosBaseUrl,
//   setAuthToken,
// } from "../../../config/axios-configuration";

const axios = axiosBaseUrl();

export const SignUp = createAsyncThunk(
  "auth/signUp",
  async (user, { rejectWithValue }) => {
    // console.log('env:',process.env.APP_URL);
    try {
      const response = await fetch(`${process.env.APP_URL}/api/signup-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: user.firstName,
          lastname: user.lastName,
          username: user.userName,
          password: user.password,
          email: user.email,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          rejectWithValue: "rejected with value",
          err: err.response.data,
          status: err.response.status,
        });
      }
      return rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);

export const SignIn = createAsyncThunk(
  "auth/signIn",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.APP_URL}/api/login-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.status === 500) {
        return rejectWithValue({
          status: 500,
          error: "unexpected error occurred..",
        });
      }
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);

export const Logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
     localStorage.removeItem('token')
    try {
      const response = await fetch(`${process.env.APP_URL}/api/logout-user`);
      return { status: 200 };
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);

export const ChangePassword = createAsyncThunk(
  "auth/changepassword",
  async (passwords, { rejectWithValue }) => {
    try {
      console.log(passwords);
      const response = await fetch(
        `${process.env.APP_URL}/api/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwords),
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);

export const SendResetEmail = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    console.log("from forgot slice:", email);
    try {
      const emailObj = { email: email };
      const response = await fetch(
        `${process.env.APP_URL}/api/reset-pass-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailObj),
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);

export const ResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (passwords, { rejectWithValue }) => {
    console.log(passwords);
    const { password, email } = passwords;
    try {
      const response = await fetch(
        `${process.env.APP_URL}/api/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: password, email: email }),
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState: {
    infoMessage: "",
    errorMessage: "",
    token: "",
    userId: "",
    success: false,
    loading: false,
    isSignUp: false,
    user: "",
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
  },

  extraReducers: {
    [SignUp.pending]: (state, action) => ({
      ...state,
      success: false,
      loading: true,
    }),
    [SignUp.fulfilled]: (state, action) => ({
      ...state,
      success: true,
      loading: false,
      isSignUp: true,
    }),
    [SignUp.rejected]: (state, action) => ({
      ...state,
      errorMessage: action.payload?.err?.errorMessage,
      success: false,
      loading: false,
    }),
    [SignIn.pending]: (state, action) => ({
      ...state,
      success: false,
      loading: true,
    }),
    [SignIn.fulfilled]: (state, action) => {
      try {
        if (action.payload.status !== 404) {
          const { user, token } = action.payload;
          state.user = user;
          state.userId = user.id;
          state.token = token;
          state.success = true;
          state.loading = false;
          setAuthToken(token);
        } else {
          state.errorMessage = action.payload.message;
          state.success = false;
          state.loading = false;
        }
      } catch (error) {
        state.loading = false;
      }
    },
    [SignIn.rejected]: (state, action) => ({
      ...state,
      errorMessage: action.payload?.err?.errorMessage,
      loading: false,
    }),
    [Logout.pending]: (state, action) => ({
      ...state,
      success: false,
      loading: true,
    }),
    [Logout.fulfilled]: (state, action) => ({
      infoMessage: "",
      errorMessage: "",
      token: "",
      userId: "",
      success: false,
      loading: false,
      isSignUp: false,
      user: "",
    }),
    [Logout.rejected]: (state, action) => ({
      ...state,
      errorMessage: action.payload?.err?.errorMessage,
      success: false,
      loading: false,
    }),

    [ChangePassword.pending]: (state, action) => ({
      ...state,
      success: false,
      loading: true,
    }),
    [ChangePassword.fulfilled]: (state, action) => ({
      ...state,
      success: true,
      loading: false,
      isSignUp: true,
    }),
    [ChangePassword.rejected]: (state, action) => ({
      ...state,
      errorMessage: action.payload?.err?.errorMessage,
      success: false,
      loading: false,
    }),

    [SendResetEmail.pending]: (state, action) => ({
      ...state,
      success: false,
      loading: true,
    }),
    [SendResetEmail.fulfilled]: (state, action) => ({
      ...state,
      success: true,
      loading: false,
      infoMessage: action.payload.message,
    }),
    [SendResetEmail.rejected]: (state, action) => ({
      ...state,
      errorMessage: action.payload?.err?.errorMessage,
      loading: false,
    }),
    [ResetPassword.pending]: (state, action) => ({
      ...state,
      success: false,
      loading: true,
    }),
    [ResetPassword.fulfilled]: (state, action) => ({
      ...state,
      success: true,
      loading: false,
      infoMessage: action.payload.message,
    }),
    [ResetPassword.rejected]: (state, action) => ({
      ...state,
      errorMessage: action.payload?.err?.errorMessage,
      loading: false,
    }),
  },
});

const { reducer, actions } = auth;

export const { SetState } = actions;

export default reducer;
