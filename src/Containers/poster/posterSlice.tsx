import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axios-api";
import {Poster, postersState} from "../../types";

const initialState: postersState= {
    posts: [],
    loading: false,
    disabled: false,
    posting: false,
};

export const fetchPosterPost = createAsyncThunk<void, Poster>(
    'poster/fetchPost',
    async (arg) => {
        await axiosApi.post('/todo.json', arg)
    }
);

export const fetchDelete = createAsyncThunk<void, Poster> (
    'poster/fetchDelete',
    async (arg) => {
        await axiosApi.delete('/todo/' + arg.id + '.json');
    }
)

export const fetchPosterChange = createAsyncThunk<void, Poster>(
    'poster/fetchPostChange',
    async (arg) => {
        await axiosApi.put('/todo/' + arg.id + '.json', arg);
    }
);

export const fetchPoster = createAsyncThunk(
    'poster/fetch',
    async () => {
        const response = await axiosApi.get('/todo.json');
        return Object.keys(response.data).map(key =>{
            return {...response.data[key], id: key}
        })
    }
);

export const posterSlice = createSlice({
    name: 'poster',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPoster.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPoster.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        });
        builder.addCase(fetchPoster.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchPosterPost.pending, (state) => {
            state.posting = true;
        });
        builder.addCase(fetchPosterPost.fulfilled, (state) =>{
            state.posting = false;
        });
        builder.addCase(fetchPosterPost.rejected, (state) => {
            state.posting = false;
        });
        builder.addCase(fetchPosterChange.pending, (state) => {
            state.disabled = true;
        });
        builder.addCase(fetchPosterChange.fulfilled, (state) =>{
            state.disabled = false;
        });
        builder.addCase(fetchPosterChange.rejected, (state) => {
            state.disabled = false;
        });
        builder.addCase(fetchDelete.pending, (state) => {
            state.disabled = true;
        });
        builder.addCase(fetchDelete.fulfilled, (state) =>{
            state.disabled = false;
        });
        builder.addCase(fetchDelete.rejected, (state) => {
            state.disabled = false;
        });
    }
});

export const posterReducer = posterSlice.reducer;