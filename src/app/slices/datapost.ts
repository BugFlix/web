import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Post {
    postId: number;
    nickname: string;
    title: string;
    tags: string [];
    like_count: number;
    is_like: boolean;
    imageUrl: string;
    createdDate: string;
    modifiedDate: string;
  }
interface DataPostState {
  dataPost: Post[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: DataPostState = {
  dataPost: [],
  isLoading: false,
  isError: false,
};

const datapostSlice = createSlice({
    name: 'datapost',
    initialState,
    reducers: {
      setDataPost: (state, action: PayloadAction<Post[]>) => {
        state.dataPost = action.payload;
    },
     setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
    },
      setError: (state, action: PayloadAction<boolean>) => {
        state.isError = action.payload;
    },
    },
});

export const { setDataPost, setLoading, setError } = datapostSlice.actions;
export default datapostSlice.reducer;