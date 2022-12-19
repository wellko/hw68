import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axios-api";
import {Poster, postersState} from "../../types";

const initialState: postersState= {
    posts: [],
    loading: false,
};

export const fetchPosterPost = createAsyncThunk<void, Poster>(
    'poster/fetchPost',
    async (arg) => {
        await axiosApi.post('/todo.json', arg)
    }
);

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
        let todo = []
        todo = Object.keys(response.data).map(key =>{
            return {...response.data[key], id: key}
        })
        return todo;
    }
);

export const posterSlice = createSlice({
    name: 'poster',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPoster.pending, (state) => {
        });
        builder.addCase(fetchPoster.fulfilled, (state, action) => {
            state.loading = true;
            state.posts = action.payload;
        });
        builder.addCase(fetchPoster.rejected, (state) => {
        });
        builder.addCase(fetchPosterPost.fulfilled, (state) =>{
            fetchPoster()
        })
    }
});

export const posterReducer = posterSlice.reducer;
// export const {DisplayChange, Result, ClearDisplay, DeleteLastChar, SymbolChange} = CalcSlice.actions;