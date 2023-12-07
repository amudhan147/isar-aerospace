import { combineReducers } from 'redux';
import spectrumSlice from './slice/spectrumStatus-Slice';

const rootReducer = combineReducers({
  spectrumSlice: spectrumSlice,
});

export default rootReducer;
