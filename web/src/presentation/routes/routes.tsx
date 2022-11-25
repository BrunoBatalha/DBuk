import { AuthService } from 'infra/services/AuthService';
import { BottomNavigationMain } from 'presentation/components/bottom-navigation-main/bottom-navigation-main';
import { Container } from 'presentation/components/container/container';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const TimelineLazy = React.lazy((): any => import('main/factories/timeline-factory'));
const PublishPostLazy = React.lazy((): any => import('main/factories/publish-post-factory'));
const RegisterLazy = React.lazy((): any => import('main/factories/register-factory'));

export function RoutesRoot(): JSX.Element {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<BottomNavigationMain />} />}>
            <Route index element={<PrivateRoute element={<TimelineLazy />} />}></Route>
            <Route path="/publish-post" element={<PrivateRoute element={<PublishPostLazy />} />}></Route>
          </Route>

          <Route path="/register" element={<RegisterLazy />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

function PrivateRoute({ element }: { element: JSX.Element }): JSX.Element {
  const hasCredentials = AuthService.getPassword() && AuthService.getUsername();
  if (!hasCredentials) {
    return <Navigate to="/register" />;
  }

  return <React.Suspense fallback={<>loading</>}>{element}</React.Suspense>;
}
