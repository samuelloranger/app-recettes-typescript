import React from 'react';

interface Props{
	username: string
}

function Header({ username }:Props):JSX.Element {
	return (
		<header className="header">
			<div className="container">
				<h1 className="text-center">{username}'s recipe</h1>
			</div>
		</header>
	);
}

export default Header;
