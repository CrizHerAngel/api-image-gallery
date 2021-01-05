import { format } from 'morgan';
import app from './app';
import {startConnection} from './db';

async function main() {
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();