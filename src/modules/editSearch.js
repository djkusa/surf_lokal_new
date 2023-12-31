import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {uploadImageAPI} from '../config/apiMethod';
import BASEURl from '../services/Api'

export const editSearch = createAsyncThunk('editSearch', async dispatch => {
  return await uploadImageAPI(
    BASEURl+'webapi/v1/search/edit_search.php',
    dispatch,
  )
    .then(async response => {
      const {data} = response;
      return data;
    })
    .catch(e => {
      if (e.response) {
      } else if (e.request) {
      } else {
      }
    });
});

const editSearchSlice = createSlice({
  name: 'editSearch',
  initialState: {
    editSearchData: [],
    status: null,
  },
  extraReducers: {
    [editSearch.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editSearch.fulfilled]: (state, action) => {
      state.status = 'success';
      state.editSearchData = action.payload;
    },
    [editSearch.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default editSearchSlice.reducer;
