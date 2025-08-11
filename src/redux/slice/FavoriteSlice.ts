import { ITrack } from "@/types/backend";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  track: ITrack[];
  filter: string;
}

const initialState: IState = {
  track: [],
  filter: "",
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    handleChangeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    handleAddTrack: (state, action: PayloadAction<ITrack>) => {
      const index = state.track.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.track.push(action.payload);
      }
    },
    handleRemoveTrack: (state, action: PayloadAction<ITrack>) => {
      const index = state.track.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        state.track.filter((item) => item.id !== action.payload.id);
      }
    },
  },
});

export const { handleChangeFilter, handleAddTrack, handleRemoveTrack } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
