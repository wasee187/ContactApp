import express from 'express';
import jsonServer from 'json-server';
import path from 'path';
const app = express();

app.use(
  '/api',
  jsonServer.defaults(),
  jsonServer.router(path.resolve(__dirname, 'db.json'))
);
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
