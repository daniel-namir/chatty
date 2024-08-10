//Daniel Namir

const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

const port = 80;

const app = express();
app.use(parser.json() );
app.use(parser.urlencoded({ extended: true })); 

const db = mongoose.connection;
const mongoDBURL = 'mongodb://localhost/chats';

var schema = mongoose.Schema;
var chatMessageSchema = new schema({
    time: { type: Date, default: Date.now },
    alias: String,
    message: String
});

var chatMessage = mongoose.model('ChatMessage', chatMessageSchema);

app.use(express.static('public_html'));

//Set up default mongoose connection
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//dealing with first type of request - GET
app.get('/chats', (req, res) => {
    chatMessage
        .find({})
        .exec( (error, results) => {
            if (error) { return res.end('ERROR'); }
            var resultString = '<br>';
            for (i in results) {
                r = results[i];
                resultString += '<b id="output">' + r.alias + ': </b>' + r.message + '<br>';
            }
            res.end(resultString);
        });
});

//dealing with second type of request - POST
app.post('/chats/post/:alias/:message', (req, res) => {
    var newMessage = new chatMessage({ alias: req.params.alias, message: req.params.message });
    newMessage.save( (error) => {
        if (error) res.end('PROBLEM: ' + res.status);
        res.end('SAVED');
    });
});

//clear chat
app.get('/clear', (req, res) => {
    db.dropDatabase();
});

app.listen(port, () => {
    console.log('Server has started');
});