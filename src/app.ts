import express from 'express';
import bodyParser from 'body-parser';
import { postLaunchProcess, getProcessNames, getRunningProcessIds, next, back } from './controllers/processController';
// Set up the express app
const app = express();
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/v1/process-names', getProcessNames);
app.get('/api/v1/running-processes', getRunningProcessIds);

app.post('/api/v1/launch', postLaunchProcess);
app.post('/api/v1/next', next);
app.post('/api/v1/back', back);


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`)
});