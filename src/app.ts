import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();

import indexRoutes from './routes/index';

//SETTINGS
app.set('port', process.env.PORT || 4000);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use('/api', indexRoutes);

// This folder for this application will be to store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;