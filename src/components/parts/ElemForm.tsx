import React, { Fragment, ChangeEvent } from 'react';

interface Props {
	label: string,
	type: string,
	name: string,
	action: Function,
	value?: string
}

function ElemForm({ label, type, name, action, value }:Props) {
	return (
		<Fragment>
			<label htmlFor={name}>{label}</label>
			{type !== 'textarea' ? (
				<input type={type} id={name} name={name} onChange={(e:ChangeEvent<HTMLInputElement>) => action(e.currentTarget.value)} value={value} />
			) : (
				<textarea id={name} name={name} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => action(e.currentTarget.value)} value={value} />
			)}
		</Fragment>
	);
}

export default ElemForm;
