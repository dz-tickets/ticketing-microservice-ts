import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/createuser', (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});