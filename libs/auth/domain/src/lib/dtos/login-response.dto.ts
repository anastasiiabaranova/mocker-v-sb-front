export type LoginResponseDto = Readonly<{
	email: string;
	authenticationToken: string;
	refreshToken: string;
	expiresAt: number;
}>;
