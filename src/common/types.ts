// Types and constants

export interface Appointment {
	id: string;
	date: string;
	formattedHour: string;
	user: {
		name: string;
		avatar_url: string;
	};
	created_at: string;
}

export interface IAppointmentsProps {
	title: string;
	appointments: Appointment[];
}

export interface MonthAvailabilityItem {
	day: number;
	available: boolean;
}

export interface User {
	id: string;
	avatar_url: string;
	name: string;
	email: string;
}

export interface AuthState {
	token: string;
	user: User;
}

export interface Credentials {
	email: string;
	password: string;
}
