import React, { useState } from 'react';

//Router
import { Link } from 'react-router-dom';

//Icons
import { FontAwesomeIcon } from '.';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

//Firebase
import { storageRef } from '../../firebase';

//Interfaces
import { IRecipe } from "../interfaces"

interface Props{
	key: string,
	recipe: IRecipe,
	slug?: string
}

function Card({ recipe, slug }:Props):JSX.Element {
	// console.log(recipe);
	const id:Object = recipe.id;
	const details:IRecipe = recipe;
	const [ imgLink, setImgLink ] = useState<string>("");
	const [ imgLoaded, setImgLoaded ] = useState<boolean>(false);

	const getImgLink = () => {
		if(!imgLoaded){
			storageRef.child(`${details.image}`).getDownloadURL()
			.then(response => {
				setImgLink(response);
				setImgLoaded(true);
			})
		}
	};
	getImgLink();

	return (
		<div className="recipes__content__card">
			<h3 className="title">{details.nom}</h3>

			<div className="content">
				<Link className="content__editLink" to={`/${slug}/edit/${id}`}>
					<FontAwesomeIcon icon={faEdit} />Modifier
				</Link>
				
				{ !imgLoaded ? <p>Loading image...</p>: <img className="content__image" src={imgLink} alt={`${details.nom}`} /> }
				

				<div className="content__infos">
					<h4>Ingrédients</h4>

					<ul>
						{details.ingredients.split(',').map((ingredient, key) => {
							return <li key={key}>{ingredient}</li>;
						})}
					</ul>

					<h4>Instructions</h4>
					<ol>
						{details.instructions.split('\n').map((instruction, key) => {
							return <li key={key}>{instruction}</li>;
						})}
					</ol>
				</div>
			</div>
		</div>
	);
}

export default Card;
