import express from 'express';
import bodyParser from 'body-parser';

import routes from "./src/routes/index";

const app = express();
const PORT = 4000;
const env = process.env;

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
  const appName = env['EX_APP_NAME'];
  if (appName) {
    res.send({message: `Hello from ${appName} running in a Docker container behind Nginx!`});
  } else {
    res.send({message: "Hello from Node and Express!"});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
