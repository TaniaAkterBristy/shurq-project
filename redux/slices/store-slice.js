import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosBaseUrl, setAuthToken } from '../../config/axios-configuration';

const axios = axiosBaseUrl();

export const GetStores = createAsyncThunk(
  'store/get-stores',
  async (data, { rejectWithValue, getState }) => {
    try {
      setAuthToken(getState().auth.token)
      const response = await axios.get(
        '/store/stores',
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data.error || err.response.data.errorMessage,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: 'Network Error'
      });
    }
  }
);

export const GetAllStores = createAsyncThunk(
  'store/get-all-stores',
  async (data, { rejectWithValue, getState }) => {
    try {
      setAuthToken(getState().auth.token)
      // console.log('In all stores')
      const response = await axios.get(
        '/store/get-all-stores'
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data.error || err.response.data.errorMessage,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: 'Network Error'
      });
    }
  }
);

export const CreateStore = createAsyncThunk(
  'store/create-sp-store',
  async (data, { rejectWithValue, getState }) => {
    try {
      setAuthToken(getState().auth.token)
      const response = await axios.post('/store', data);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data.message || err.response.data.errorMessage,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: 'Network Error'
      });
    }
  }
);

const store = createSlice({
  name: 'store',
  initialState: {
    success: false,
    loading: false,
    total: null,
    stores: [],
    err: '',
    storeName: '',
    spApiState: '',
    region: '',
    sellerId: '',
    storeId: '',
    amazonState: '',
    amazonUrl: '',
    message: '',
    storeSuccess: false
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
    amazonStoreInfo(state, action) {
      return {
        ...state,
        spApiState: action.payload.state,
        region: action.payload.region
      };
    },
    clearState(state, action) {
      return {
        ...state,
        storeNames: []
      };
    }
  },
  extraReducers: {
    [GetStores.pending]: (state, action) => ({
      ...state,
      getStoreFlag: false,
      loading: true
    }),
    [GetStores.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      success: true,
      total: action.payload.total,
      getStoreFlag: true,
      stores: action.payload.stores
    }),
    [GetStores.rejected]: (state, action) => ({
      ...state,
      total: 0,
      stores: [],
      loading: false,
      getStoreFlag: false,
      err: action.payload.err
    }),
    [GetAllStores.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      allStores: action.payload.allStores
    }),
    [CreateStore.fulfilled]: (state, action) => ({
      ...state,
      storeId: action.payload.store._id,
      store: action.payload.store,
      success: true,
      loading: false,
      storeSuccess: true
    }),
    [CreateStore.rejected]: (state, action) => ({
      ...state,
      loading: false,
      success: false,
      storeId: '',
      store: {},
      storeSuccess: false,
      err: action.payload.err
    }),
    [CreateStore.pending]: (state, action) => ({
      ...state,
      storeSuccess: false,
      storeId: '',
      store: {},
      loading: true
    })
  }
});

const { reducer, actions } = store;

export const {
  SetState,
  amazonStoreInfo,
  setMarketplaceEdit,
  clearState
} = actions;

export default reducer;
