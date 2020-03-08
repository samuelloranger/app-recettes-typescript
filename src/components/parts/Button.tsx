import React from 'react';

interface Props{
	className?: string,
	type?: "reset" | "submit" | "button" | undefined,
	action?: Function,
	children: string
};

const Button = ({ className = '', type, action, children }:Props):JSX.Element => (
	<button className={`btn ${className}`} onClick={() => action} type={type}>
		{children}
	</button>
);

export default Button;
