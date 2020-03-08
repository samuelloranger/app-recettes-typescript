import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import passwordHash from 'password-hash';

import { Button, ElemForm } from '../components/parts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

//Firebase
import base from '../firebase';

//Interfaces
import { IInscription } from "../components/interfaces";

class Inscription extends Component {
	state:IInscription = {
		fullName: '',
		password: '',
		email: '',
		fullNameValid: false,
		emailValid: false,
		passwordValid: false,
		accountOk: false
	};

	verifyInput():void {
		const { fullName, email, password } = this.state;

		const patternName:RegExp = new RegExp('[A-Za-z-]{1,}');
		const patternPassword:RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
		const patternEmail:RegExp = new RegExp('^[a-zA-Z1-3_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$');

		if (fullName !== '') {
			fullName.search(patternName) !== 0
				? this.setState({ fullNameValid: false })
				: this.setState({ fullNameValid: true });
		}
		if (email !== '') {
			email.search(patternEmail) !== 0
				? this.setState({ emailValid: false })
				: this.setState({ emailValid: true });
		}
		if (password !== '') {
			password.search(patternPassword) !== 0
				? this.setState({ passwordValid: false })
				: this.setState({ passwordValid: true });
		}
	}

	/**
	 * Method handleChange
     * @param {EventTarget} e Event that calls the function
	 * @description Change the value in the state
	 */
	handleChange = (e:Event):void => {
		const element = e.currentTarget as HTMLInputElement;

		this.setState({
			[element.name]: element.value
		});

		this.verifyInput();
	};

	/**
     * Method handleSubmit
     * @param {EventTarget} e Event that calls the function
     * @description Tests a last time if the username is valid and connects to the app
     */
	handleSubmit = (e:Event) => {
		e.preventDefault();
		const { fullName, fullNameValid, email, emailValid, password, passwordValid } = this.state;

		const hashedPassword:string = passwordHash.generate(password);

		if (fullNameValid && emailValid && passwordValid) {
			const uuid:number = Date.now();
			const slug:string = fullName.replace(' ', '-').toLowerCase();

			base
				.post(`${slug}${uuid}`, {
					data: {
						fullName: fullName,
						slug: `${slug}${uuid}`,
						email: email,
						password: hashedPassword
					}
				})
				.then(() => {
					this.setState({
						accountOk: true
					});
				})
				.catch((err) => {
					// handle error
				});
		}
	};

	render():JSX.Element {
		const { fullName, fullNameValid, email, emailValid, password, passwordValid, accountOk } = this.state;

		const handleChange:Function = this.handleChange;
		const handleSubmit:Function = this.handleSubmit;

		if (accountOk) {
			return <Redirect push to={`/`} />;
		}
		return (
			<div className="container containerForm mt-5">
				<form className="formConnexion" onSubmit={() => handleSubmit}>
					<h1 className="text-center">Register</h1>

					<ElemForm label="Full name" name="fullName" action={handleChange} value={fullName} type="text" />
					{!fullNameValid && fullName ? (
						<span className="error">
							<FontAwesomeIcon icon={faExclamation} />Full name incorrect
						</span>
					) : null}

					<ElemForm label="Email" name="email" action={handleChange} value={email} type="text"/>
					{!emailValid && email ? (
						<span className="error">
							<FontAwesomeIcon icon={faExclamation} />Email incorrect
						</span>
					) : null}

					<ElemForm label="Password" type="password" name="password" action={handleChange} value={password} />
					<small>
						Password must contain at least one special character, one number, one lowercase and one
						uppercase character and must be 8 characters long.
					</small>
					{!passwordValid && password ? (
						<span className="error">
							<FontAwesomeIcon icon={faExclamation} />Password incorrect
						</span>
					) : null}

					<div className="formConnexion__btns">
						<Button type="submit">Register</Button>
					</div>
				</form>
			</div>
		);
	}
}

export default Inscription;
