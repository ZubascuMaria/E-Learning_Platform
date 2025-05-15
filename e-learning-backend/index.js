// index.js
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serverul rulează la adresa: http://localhost:${PORT}`);
});
