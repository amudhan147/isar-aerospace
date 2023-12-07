import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { SERVICE_URL } from '../Service';
import { RootState } from '../store';

interface State {
  isLoading: boolean;
  getSpectrumStatusClear: object;
  getSpectrumStatus: object;
}

const initialState: State = {
  isLoading: false,
  getSpectrumStatusClear: {},
  getSpectrumStatus: {},
};

const slice = createSlice({
  name: 'SpectrumStatus',
  initialState,
  reducers: {
    getSpectrumStatusClear: (state, action) => {
      state.isLoading = false;
      state.getSpectrumStatusClear = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpectrumStatus.pending, (state, action) => {
        state.isLoading = true;
        state.getSpectrumStatus = {};
      })
      .addCase(getSpectrumStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getSpectrumStatus = action.payload;
      })
      .addCase(getSpectrumStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.getSpectrumStatus = action.error;
      });
  },
});

export const { getSpectrumStatusClear } = slice.actions;
export default slice.reducer;
export const getSpectrumData = (state: RootState) => state.spectrumSlice;

export const getSpectrumStatus = createAsyncThunk(
  'SpectrumStatus/SpectrumStatus',
  async (payload: any, thunkApi) => {
    const getResponse = await axios.get(
      SERVICE_URL.SpectrumStatus);
    return getResponse.data;
  }
);
