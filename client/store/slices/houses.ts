import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unionBy } from 'lodash';
import { CoreState } from '../';

type HousesState = {
  houses: House[];
};

const initialState: HousesState = {
  houses: [],
};

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    addHouses: (state, action: PayloadAction<{ houses: House[] }>) => {
      state.houses = unionBy(action.payload.houses, state.houses, 'uuid');
    },
  },
});

export const selectHouses = (state: CoreState) => state.houses;

export const { addHouses } = housesSlice.actions;

export const housesReducer = housesSlice.reducer;
