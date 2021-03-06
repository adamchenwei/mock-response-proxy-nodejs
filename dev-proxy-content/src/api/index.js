import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.get('/user', (req, res) => {
		res.json({ theUserName: 'Adam' });
	});

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ myAnswer: 'abc' });
	});


	api.post('/post/:dynamicPathHere', (req, res) => {
		console.log(req.params);
		res.json({ theUserName: 'Adam' });
	});

	return api;
}
