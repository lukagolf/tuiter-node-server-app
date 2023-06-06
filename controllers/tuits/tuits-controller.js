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
    tuits.push(newTuit);
    res.json(newTuit);
}

/* const AddNewTuit = async (req,res) =>
{
    console.log("Inside controller")
    let NewTuit = req.body;

    NewTuit.likes = 0;
    NewTuit.liked = false;

    NewTuit.topic = "Traffic";
    NewTuit.username = "The Boring Company";
    NewTuit.handle = "@boringcompany";
    NewTuit.time = "2h";
    NewTuit.image = "../../Images/Tesla.png";
    NewTuit.title = "The Boring Company fixing traffic";
    NewTuit.replies = 0;
    NewTuit.dislikes = 0;
    NewTuit.retuits = 0;
    console.log(NewTuit);
    const InsertedTuit = await TuitsDAO.createTuit(NewTuit);
    res.send(InsertedTuit );
} */

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