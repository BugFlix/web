import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
    postId: number | null;
}

const initialState: PostState = {
    postId: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
      setPostId: (state, action: PayloadAction<number | null>) => {
        state.postId = action.payload;
      },
    },
});

export const { setPostId } = postSlice.actions;
export default postSlice.reducer;