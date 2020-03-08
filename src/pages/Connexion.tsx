import React, { useState, useEffect, FormEvent } from 'react';
import { Redirect, Link } from 'react-router-dom';

//Librairies
import passwordHash from 'password-hash';

//Components
import { FontAwesomeIcon, Button, ElemForm } from '../components/parts';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

//Firebase
import base from '../firebase';

//Interfaces
import { IUser } from "../components/interfaces";

function Connexion():JSX.Element {
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const [ emailValid, setEmailValid ] = useState<boolean>(true);

	const [ slug, setSlug ] = useState<string>('');

	const [ connected, setConnected ] = useState<boolean>(false);

	const [ emailNotFound, setEmailNotFound ] = useState<boolean>(false);
	const [ wrongPassword, setWrongPassword ] = useState<boolean>(false);

	const patternName:RegExp = new RegExp('[A-Za-z-]{1,}');

	useEffect(() => {
		let isCancelled = false;

		if (email !== '') {
			if(isCancelled){
				email.search(patternName) !== 0 ? setEmailValid(false) : setEmailValid(true);
			}
		}

		return () => {
			isCancelled = true;
		}

	  }, [email, patternName]); // no dependencies!
	

	/**
     * Method handleSubmit
     * @param {EventTarget} e Event that calls the function
     * @description Tests a last time if the email is valid and connects to the app
     */
	const handleSubmit = (e:FormEvent):void => {
		e.preventDefault();
		let users:Object = {};
		base
			.fetch('/', {
				context: {}
			})
			.then((data) => {
				users = data;
			})
			.then(() => {
				if (email !== '') {
					verifyUser();
				}
			})
			.catch((error) => {
				//handle error
			});

		const verifyUser = ():void => {
			Object.entries(users).forEach((user:IUser) => {
				if (email === user[1].email) {
					if (passwordHash.verify(password, user[1].password)) {
						setSlug(user[1].slug);
						setConnected(true);
					} else {
						setWrongPassword(true);
						console.log('Wrong password');
					}
				} else {
					setEmailNotFound(false);
				}
			});
		};
	};

	if (connected) {
		return <Redirect to={`/${slug}`} />;
	}
	return (
		<div className="container containerForm mt-5">
			<form className="formConnexion" onSubmit={handleSubmit}>
				<h1 className="text-center">Recipe box</h1>

				{emailNotFound && <p className="error">This account does not exist</p>}

				{!emailValid && (
					<p className="error">
						<FontAwesomeIcon icon={faExclamation} />Email incorrect
					</p>
				)}
				<ElemForm
					label="Email"
					type="text"
					name="email"
					action={setEmail}
					value={email}
				/>

				<ElemForm
					label="Password"
					type="password"
					name="password"
					action={setPassword}
					value={password}
				/>

				{wrongPassword && <p className="error">Password incorrect</p>}

				<div className="formConnexion__btns">
					<Button type="submit">Connect</Button>

					<Link to="/register" className="btn btn--register">
						Register
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Connexion;
