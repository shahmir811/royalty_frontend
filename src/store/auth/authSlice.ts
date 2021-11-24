import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import setAuthToken from 'store/utils/setAuthToken';
// import { RootState, AppThunk } from 'app/store';
import { loginRequest } from './authAPI';
import {
	LoginRequestType,
	InitialStateType,
	UserType,
	UserResponseType,
} from './authTypes';

const INITIAL_STATE: InitialStateType = {
	user: null,
	loading: false,
	isAuthenticated: false,
	errors: null,
};

export const loginUserAsync = createAsyncThunk(
	'auth/loginUser',
	async (record: LoginRequestType) => {
		const response = await loginRequest(record);
		return response.data;
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState: INITIAL_STATE,
	reducers: {
		removeErrors: state => {
			console.log('Remove error now');
			state.errors = '';
		},
		setUser: (state, action: PayloadAction<UserType>) => {
			const { payload } = action;
			state.user = payload;
			state.isAuthenticated = true;
		},
		logoutUser: state => {
			setAuthToken();
			localStorage.removeItem('user');
			state.user = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: builder => {
		builder.addCase(loginUserAsync.pending, state => {
			state.loading = true;
			state.errors = '';
		});
		builder.addCase(
			loginUserAsync.fulfilled,
			(state, action: PayloadAction<UserResponseType>) => {
				const { payload } = action;
				state.loading = false;
				state.user = payload.user;
				state.isAuthenticated = true;
			}
		);
		builder.addCase(loginUserAsync.rejected, state => {
			state.loading = false;
			state.errors = 'Login failed';
		});
	},
});

export const { setUser, removeErrors, logoutUser } = authSlice.actions;

export default authSlice.reducer;
