import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import login from './login';

import config from './config.json';

import proxy from 'http-proxy-middleware';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.use('/login', login({ config, db }));



	//PROXY SETUP BEG
	// const proxyOptions = {
	// 	target: 'http://www.example.org', // target host
	// 	changeOrigin: true,               // needed for virtual hosted sites
	// 	ws: true,                         // proxy websockets
	// 	pathRewrite: {
	// 		'^/api/old-path' : '/api/new-path',     // rewrite path
	// 		'^/api/remove/path' : '/path'           // remove base path
	// 	},
	// 	router: {
	// 		// when request.headers.host == 'dev.localhost:3000',
	// 		// override target 'http://www.example.org' to 'http://localhost:8000'
	// 		'dev.localhost:3000' : 'http://localhost:8000'
	// 	}
	// };
	// var exampleProxy = proxy(proxyOptions);
	// app.use('/stuff', exampleProxy);

	//default this app is 8089
	app.use('/', proxy({target: 'http://www.mysite.com', changeOrigin: true}));
	//PROXY SETUP END



	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
