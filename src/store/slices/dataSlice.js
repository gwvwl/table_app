import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as axios from "axios";
import { saveExcel } from "../../saveExcel/saveExcel";
import { logout } from "./userSlice";
export const delData = createAsyncThunk(
    "data/delData",
    async ({ id, body, offset }, { rejectWithValue, dispatch, getState }) => {
        const token = getState().user.token;
        try {
            await fetch(`http://localhost:3000/report/${id}`, {
                method: "delete",
                headers: {
                    authorization: token,
                },
            }).then(() => {
                dispatch(getFilterData({ body, offset }));
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const putData = createAsyncThunk(
    "data/putData",
    async (
        { id, body, url, offset },
        { rejectWithValue, dispatch, getState }
    ) => {
        const token = getState().user.token;
        try {
            await fetch(`http://localhost:3000/report/${id}`, {
                method: "put",
                headers: {
                    authorization: token,
                },
                body: body,
            }).then(() => {
                dispatch(getFilterData({ body: url, offset }));
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getDataExsel = createAsyncThunk(
    "data/getDataExsel",
    async (
        { body, limit = "25", columns },
        { rejectWithValue, dispatch, getState }
    ) => {
        const token = getState().user.token;
        try {
            await fetch(`http://localhost:3000/report?${body}`, {
                headers: {
                    authorization: token,
                },
            })
                .then((result) => {
                    if (result.status === 401) dispatch(logout());
                    return result.json();
                })
                .then((data) => saveExcel(data.data, columns));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getFilterData = createAsyncThunk(
    "data/getFilterData",
    async (
        { body, offset = "0", limit = "25" },
        { rejectWithValue, dispatch, getState }
    ) => {
        const token = getState().user.token;

        try {
            await fetch(
                `http://localhost:3000/report?${body}&offset=${offset}&limit=${limit}`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
                .then((result) => {
                    if (result.status === 401) dispatch(logout());
                    return result.json();
                })
                .then((data) => {
                    return dispatch(filterData(data));
                });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const setPending = (state) => {
    state.loading = true;
};
const setRejected = (state) => {
    state.loading = false;
};

const data = createSlice({
    name: "data",
    initialState: {
        data: null,
        error: null,
        loading: false,
        excel: null,
    },
    reducers: {
        setData(state, { payload }) {
            state.data = payload;
        },
        filterData(state, { payload }) {
            state.data = payload.data;
            state.total = payload.total_count;
        },
    },
    extraReducers: {
        [getDataExsel.pending]: setPending,
        [getDataExsel.fulfilled]: setRejected,
        [getDataExsel.rejected]: setRejected,
    },
});

export const { setData, filterData } = data.actions;

export default data.reducer;
