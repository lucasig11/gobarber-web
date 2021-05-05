// Types and constants

export interface Appointment {
	id: string;
	date: string;
	formattedHour: string;
	user: User;
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
export interface DayAvailabilityItem {
	hour: number;
	available: boolean;
}

export interface User {
	id: string;
	avatar_url: string;
	name: string;
	email: string;
	created_at: string;
	isProvider: boolean;
}

export interface AuthState {
	token: string;
	user: User;
}

export interface Credentials {
	email: string;
	password: string;
}

export interface INotification {
	id: string;
	content: string;
	recipient_id: string;
	created_at: string;
	read?: boolean;
}
