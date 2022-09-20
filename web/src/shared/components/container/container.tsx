import React from 'react';
import './style.scss';

export function Container({ children }: { children: React.ReactNode }): JSX.Element {
	return <div className="container">{children}</div>;
}
