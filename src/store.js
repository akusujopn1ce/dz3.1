import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSwapiData = createAsyncThunk(
  'swapi/fetchData',
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://swapi.py4e.com/api/${endpoint}`);
      if (!response.ok) {
        throw new Error('Помилка мережі або невірний запит');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const swapiSlice = createSlice({
  name: 'swapi',
  initialState: {
    data: null,
    loading: false,
    error: null,
    endpointParts: [], 
  },
  reducers: {
    clearData: (state) => {
      state.data = null;
      state.error = null;
      state.endpointParts = [];
    },
    setEndpointParts: (state, action) => {
      state.endpointParts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwapiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSwapiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSwapiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Не вдалося завантажити дані';
      });
  },
});

export const { clearData, setEndpointParts } = swapiSlice.actions;

export const store = configureStore({
  reducer: {
    swapi: swapiSlice.reducer,
  },
});