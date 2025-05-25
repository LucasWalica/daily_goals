// server.js (en la raíz del proyecto)
import { app } from './dist/daily_objectives/server/main.server.js';

const port = process.env.PORT || 4000;

app().listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
