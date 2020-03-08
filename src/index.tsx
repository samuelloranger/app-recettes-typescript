import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Pages
// import * as Pages from "./pages";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import RecipeBox from "./pages/RecipeBox";
import EditRecipe from "./pages/EditRecipe";
import NotFound from "./pages/NotFound";

const Root = ():JSX.Element => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Connexion} />
			<Route exact path="/register" component={Inscription} />
			<Route exact path="/:username" component={RecipeBox} />
			<Route exact path="/:username/add" component={EditRecipe} />
			<Route exact path="/:username/edit/:key" component={EditRecipe} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
