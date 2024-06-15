import {
  createSlice,
  createAsyncThunk,
  current
} from '@reduxjs/toolkit';
import { axiosBaseUrl, setAuthToken } from '../../config/axios-configuration';

// import { axiosBaseUrl, setAuthToken } from '../../../config/axios-configuration';
 
const axios = axiosBaseUrl();

export const GetDashobardSummary = createAsyncThunk(
  'dashboard/summary',
  async (data, { rejectWithValue, getState }) => {
    try {
      setAuthToken(getState().auth.token)
      const response = await axios.get(
        '/dashboard/summary', {
          params: data
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data.error || err.response.data.message,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: 'Network Error'
      });
    }
  }
);

export const GetGraphData = createAsyncThunk(
  'dashboard/graph-data',
  async (data, { rejectWithValue, getState }) => {
    try {
      setAuthToken(getState().auth.token)
      const response = await axios.get(
        '/dashboard/graph-data', {
          params: data
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data.error || err.response.data.message,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: 'Network Error'
      });
    }
  }
);

export const GetSales = createAsyncThunk(
  'dashboard/sales',
  async (data, { rejectWithValue, getState }) => {
    try {
      setAuthToken(getState().auth.token)
      const response = await axios.get(
        '/dashboard/sales', {
          params: data
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data.error || err.response.data.message,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: 'Network Error'
      });
    }
  }
);

export const GetSalesByCustomDate = createAsyncThunk(
  'dashboard/sales-by-custom-date',
  async (data, { rejectWithValue, getState }) => {
    try {
      setAuthToken(getState().auth.token)
      const response = await axios.get(
        '/dashboard/sales-by-custom-date', {
          params: data
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data.error || err.response.data.message,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: 'Network Error'
      });
    }
  }
);

const dashboard = createSlice({
  name: 'dashboard',
  initialState: {
    success: false,
    loading: false,
    allCards: [{
      key: 'adSale',
      title: "Sales",
      // helpText: "Explain Sales here...",
      value: 0,
      valueText: "Total",
      cardColor: "#2C658A",
      prevPercentage: "0%",
      prevPercentageisUp: true,
      isShowing: true,
      accountType: 'ad',
      type: 'amount'
    }, {
      key: 'adSpend',
      title: "Spend",
      // helpText: "Spend help text..",
      value: 0,
      valueText: "Total",
      cardColor: "#063E63",
      prevPercentage: "-32.66%",
      prevPercentageisUp: false,
      isShowing: true,
      accountType: 'ad',
      type: 'amount'
    }, {
      key: 'adImpressions',
      title: "Impression",
      // helpText: "CVR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F59E4E",
      prevPercentage: "42.66%",
      prevPercentageisUp: true,
      isShowing: true,
      accountType: 'ad',
      type: 'number'
    }, {
      key: 'adClicks',
      title: "Clicks",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: true,
      accountType: 'ad',
      type: 'number'
    }, {
      key: 'adOrders',
      title: "Orders",
      // helpText: "Explain Sales here...",
      value: 0,
      valueText: "Total",
      cardColor: "#2C658A",
      prevPercentage: "43.66%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'ad',
      type: 'number'
    }, {
      key: 'adCpc',
      title: "CPC",
      // helpText: "Spend help text..",
      value: 0,
      valueText: "Total",
      cardColor: "#063E63",
      prevPercentage: "-32.66%",
      prevPercentageisUp: false,
      isShowing: false,
      accountType: 'ad',
      type: 'amount'
    }, {
      key: 'adAcos',
      title: "ACOS",
      // helpText: "CVR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F59E4E",
      prevPercentage: "42.66%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'ad',
      type: 'percentage'
    }, {
      key: 'adTotalAcos',
      title: "Total ACOS",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'ad',
      type: 'percentage'
    }, {
      key: 'adRoas',
      title: "ROAS",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'ad',
      type: 'amount'
    }, {
      key: 'adCtr',
      title: "CTR",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'ad',
      type: 'percentage'
    }, {
      key: 'adConversion',
      title: "Conversion",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'ad',
      type: 'amount'
    }, {
      key: 'adConversionRate',
      title: "Convenrsion Rate",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'ad',
      type: 'percentage'
    }, {
      key: 'spSales',
      title: "Organic Sale",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'sp',
      type: 'amount'
    }, {
      key: 'spOrders',
      title: "Organic Orders",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'sp',
      type: 'number'
    }, {
      key: 'spUnits',
      title: "Organic Units",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'sp',
      type: 'number'
    }, {
      key: 'spRefundUnits',
      title: "Refund Units",
      // helpText: "CTR Help Text...",
      value: 0,
      valueText: "Average",
      cardColor: "#F01D43",
      prevPercentage: "12.3%",
      prevPercentageisUp: true,
      isShowing: false,
      accountType: 'sp',
      type: 'number'
    },{
        key: 'spRefunds',
        title: "Refunds",
        // helpText: "CTR Help Text...",
        value: 0,
        valueText: "Average",
        cardColor: "#F01D43",
        prevPercentage: "12.3%",
        prevPercentageisUp: true,
        isShowing: false,
        accountType: 'sp',
        type: 'amount'
    }],
    graphData: [[]],
    salesData: {},
    customDateSalesData: [],
    erroMsg: ''
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    }
  },
  extraReducers: {
    [GetDashobardSummary.pending]: (state, action) => ({
      ...state,
      loading: true,
      success: false
    }),
    [GetDashobardSummary.fulfilled]: (state, action) => {
      let tempData = current(state).allCards;
      if (action.payload.graphSummary) {
        const { adSummary, spSummary } = action.payload.graphSummary;
        tempData = tempData.map((doc) => {
          return {
            ...doc,
            value: doc.accountType === 'ad' ? adSummary[doc.key] : spSummary[doc.key] || 0
          }
        })
      }
      return {
        ...state,
        loading: false,
        success: true,
        allCards: tempData
      }
    },
    [GetDashobardSummary.rejected]: (state, action) => ({
      ...state,
      loading: false,
      success: false,
      erroMsg: action.payload.err
    }),
    [GetGraphData.pending]: (state, action) => ({
      ...state,
      graphData: [[]]
    }),
    [GetGraphData.fulfilled]: (state, action) => ({
      ...state,
      graphData: action.payload.graphData
    }),
    [GetGraphData.rejected]: (state, action) => ({
      ...state,
      graphData: [[]],
      erroMsg: action.payload.err
    }),
    [GetSales.pending]: (state, action) => ({
      ...state,
      salesData: {}
    }),
    [GetSales.fulfilled]: (state, action) => ({
      ...state,
      salesData: action.payload.salesData
    }),
    [GetSales.rejected]: (state, action) => ({
      ...state,
      salesData: {},
      erroMsg: action.payload.err
    }),
    [GetSalesByCustomDate.pending]: (state, action) => ({
      ...state,
      customDateSalesData: {}
    }),
    [GetSalesByCustomDate.fulfilled]: (state, action) => ({
      ...state,
      customDateSalesData: action.payload.customDateSalesData
    }),
    [GetSalesByCustomDate.rejected]: (state, action) => ({
      ...state,
      customDateSalesData: {},
      erroMsg: action.payload.err
    })
  }
});

const { reducer, actions } = dashboard;

export const { SetState } = actions;

export default reducer;
