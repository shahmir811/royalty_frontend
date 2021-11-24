export interface LoginRequestType {
	email: string;
	password: string;
}

export interface UserType {
	id: number;
	name: string;
	email: string;
	role: string;
	status: string;
}

export interface UserResponseType {
	user: UserType;
}

export interface InitialStateType {
	user: null | UserType;
	loading: boolean;
	isAuthenticated: boolean;
	errors: null | string;
}
