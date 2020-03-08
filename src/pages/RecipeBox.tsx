import React, { Fragment, useState } from 'react';
import { Header, Card, FontAwesomeIcon } from '../components/parts';

//Router
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

//Font Awesome Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//Firebase
import base from '../firebase';

//Recipes base
// import recipebase from '../assets/recettes';

import { IRecipe } from "../components/interfaces";

interface RouterProps {
	username: string
}

function App(props:RouteComponentProps<RouterProps>) {
	const slug = props.match.params.username;
	const [ fullName, setFullName ] = useState<string>('');
	const [ recipes, setRecipes ] = useState<Array<IRecipe>>();
	const [ loaded, setLoaded ] = useState<boolean>(false);

	if (!loaded) {
		setLoaded(true);
		base
			.fetch(`/${slug}`, {
				context: {}
			})
			.then((data) => {
				setFullName(data.fullName);
				setRecipes(Object.values(data.recipes));
			});
	}

	const cards = ():Array<JSX.Element>|null => {
		if(recipes !== undefined){
			return recipes!.map((recipe:IRecipe):JSX.Element => {
				return <Card key={recipe.id} recipe={recipe} slug={slug}/>;
			});
		}
		else return null;
	};

	return (
		<Fragment>
			<Header username={fullName} />

			<main className="recipes container">
				<span className="recipes__addBtn">
					<Link to={`/${slug}/add/`}>
						<FontAwesomeIcon icon={faPlus} />
					</Link>
				</span>
				<h2 className="recipes__title">Recipes</h2>
				<div className="recipes__content">
					{cards()}
				</div>
				{/* <p onClick={addAllRecipes}>Ajouter toutes les recettes</p> */}
			</main>
		</Fragment>
	);
}

export default App;
