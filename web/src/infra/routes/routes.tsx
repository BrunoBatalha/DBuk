import { AuthService } from 'infra/services/AuthService';
import { PublishPostFactory } from 'main/factories/publish-post-factory';
import { RegisterFactory } from 'main/factories/register-factory';
import { TimelineFactory } from 'main/factories/timeline-factory';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function PrivateRoute({ element }: { element: JSX.Element }): JSX.Element {
	const hasCredentials = AuthService.getPassword() && AuthService.getUsername();
	console.log(hasCredentials);
	return hasCredentials ? element : <Navigate to="/register" />;
}

// function PrivateOutlet() {
// 	const hasCredentials = AuthService.getPassword() && AuthService.getUsername();
// 	return hasCredentials ? <Outlet /> : <Navigate to="/register" />;
// }

export function RoutesRoot(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PrivateRoute element={<TimelineFactory />} />}></Route>
				<Route path="/publish-post" element={<PrivateRoute element={<PublishPostFactory />} />}></Route>
				<Route path="/register" element={<RegisterFactory />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
