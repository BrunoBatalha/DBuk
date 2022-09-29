export type IRegisterViewModel = () => RegisterViewModelReturn;

export type RegisterViewModelReturn = {
	username: string;
	password: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	submit(): Promise<void>;
};
