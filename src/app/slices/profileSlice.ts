import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NicknameState {
    nickname: String | null;
}

const initialState: NicknameState = {
    nickname: null,
};

const nicknameSlice = createSlice({
    name: 'nickname',
    initialState,
    reducers: {
      setNickname: (state, action: PayloadAction<String | null>) => {
        state.nickname = action.payload;
      },
    },
});

export const { setNickname } = nicknameSlice.actions;
export default nicknameSlice.reducer;