import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const API_KEY:string|undefined = process.env.APP_RECETTES_FIREBASE_API_KEY;

const firebaseApp = firebase.initializeApp({
	apiKey: API_KEY,
	authDomain: 'app-recettes-6fed6.firebaseapp.com',
	databaseURL: 'https://app-recettes-6fed6.firebaseio.com',
	storageBucket: "gs://app-recettes-6fed6.appspot.com"
});

const base = Rebase.createClass(firebase.database());

const storage = firebase.storage();
const storageRef = storage.ref("/")

export { firebaseApp, storageRef };

export default base;