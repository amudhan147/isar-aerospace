import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { SERVICE_URL } from '../Service';
import { RootState, } from '../store';

interface State {
  isLoading: boolean;
  getSpectrumStatus: object;
  takeActionBoolen: number | null;
}

const initialState: State = {
  isLoading: false,
  getSpectrumStatus: {},
  takeActionBoolen: null,
};

const slice = createSlice({
  name: 'SpectrumStatus',
  initialState,
  reducers: {
    getSpectrumStatusClear: (state, action) => {
      state.isLoading = false;
      state.getSpectrumStatus = {};
    },
    actionTakenClear: (state, action) => {
      state.isLoading = false;
      state.takeActionBoolen = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpectrumStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpectrumStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getSpectrumStatus = action.payload;
      })
      .addCase(getSpectrumStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.getSpectrumStatus = action.error;
      })
    builder
      .addCase(getTakeAction.pending, (state) => {
        state.isLoading = true;
        state.takeActionBoolen = 0;
      })
      .addCase(getTakeAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.takeActionBoolen = 1;
      })
      .addCase(getTakeAction.rejected, (state, action) => {
        state.isLoading = false;
        state.takeActionBoolen = -1;
      })
  },
});

export const { getSpectrumStatusClear, actionTakenClear } = slice.actions;
export default slice.reducer;
export const getSpectrumData = (state: RootState) => state.spectrumSlice;

export const getSpectrumStatus = createAsyncThunk(
  'SpectrumStatus/SpectrumStatus',
  async (payload: any, thunkApi) => {
    const getResponse = await axios.get(SERVICE_URL.SpectrumStatus);
    return getResponse.data;
  }
);

export const getTakeAction = createAsyncThunk(
  'SpectrumStatus/TakeAction',
  async (payload: any, thunkApi) => {
    const getResponse = await axios.get(SERVICE_URL.TakeAction);
    return getResponse.data;
  }
);