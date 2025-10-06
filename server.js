const express = require('express');
const visitedRoutes = require('./routes/visitedSites');
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Mount the route at /visited
app.use('/visited', visitedRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
