const express = require('express');
const app = express();
const PORT = 8000;
const cors = require("cors")

require("./configs/dadabase")

app.use(express.json())
app.use(cors())

const loadDataToDb = require("./Middleware/getWsData")

const initializeData = async () => {
    await loadDataToDb.saveDataToDB();
};

initializeData().then(() => {
    const membersController = require("./controllers/membersController");
    app.use("/members", membersController);

    const moviesController = require("./controllers/moviesController");
    app.use("/movies", moviesController);

    const subscriptionsController = require("./controllers/subscriptionsController");
    app.use("/subscriptions", subscriptionsController);

    app.listen(PORT, () => {
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
    });
}).catch(error => {
    console.error('Error initializing data:', error);
});