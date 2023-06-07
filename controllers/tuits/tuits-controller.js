import posts from "./tuits.js";
let tuits = posts;

const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.topic = "Space";
    newTuit.username = "Nasa";
    newTuit.handle = "@nasa";
    newTuit.time = "0s";
    newTuit.image = "nasa-logo.jpg";
    newTuit.title = "Nasa's Mission";
    newTuit._id = (new Date()).getTime() + '';
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    tuits.unshift(newTuit);
    res.json(newTuit);
}

const findTuits = (req, res) => res.json(tuits);

const updateTuit = (req, res) => {
    const tuitdId = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
    tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
    res.sendStatus(200);
}


const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    tuits = tuits.filter((t) =>
        t._id !== tuitdIdToDelete);
    res.sendStatus(200);
}


export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}