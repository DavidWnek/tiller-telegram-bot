import app from './app';
import { appDebug } from './app';

const { PORT = 8080 } = process.env;

app.listen(PORT, () => {
  appDebug(`Listening on port ${PORT}`);
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
