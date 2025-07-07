import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Comment } from "../../types/Comment";

const API = "http://localhost:3001/api/comments";

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: "",
};

export const getProductComments = createAsyncThunk(
  "comments/fetch",
  async (productId: number) => {
    const res = await axios.get(`${API}/${productId}`);
    return res.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/add",
  async (payload: Omit<Comment, "id" | "date">) => {
    const res = await axios.post(API, payload);
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (commentId: number) => {
    await axios.delete(`${API}/${commentId}`);
    return commentId;
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getProductComments.rejected, (state) => {
      state.loading = false;
      state.error = "Error occured while loading comments";
    });

    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addComment.rejected, (state) => {
      state.loading = false;
      state.error = "Unable to add a comment";
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.loading = false;
      state.error = "Unable to delete a comment";
    });
  },
});

export default commentsSlice.reducer;
