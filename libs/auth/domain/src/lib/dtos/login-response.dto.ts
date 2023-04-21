export type LoginResponseDto = Readonly<{
	email: string;
	accessToken: string;
	refreshToken: string;
	expiresAt: number;
}>;
