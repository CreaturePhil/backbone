var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

var mangaSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  description: String,
  volumes: Number
});

var Manga = mongoose.model('manga', mangaSchema);

app.get('/');

app.get('/mangas', function(req, res, next) {
  Manga.find(function(err, mangas) {
    if (err) next(err);
    res.json(mangas);
  });
});

app.get('/mangas/:title', function(req, res, next) {
  Manga.findOne({title: req.params.title}, function(err, manga) {
    if (err) next(err);
    if (!manga) {
      return res.status(404).json({message: 'Manga not found.'}); 
    }
    res.json(manga);
  });
});

app.post('/mangas/:title', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  Manga.findOneAndUpdate({title: req.params.title}, req.body, function(err, manga) {
    if (err) next(err);
    if (!manga) {
      return res.status(404).json({message: 'Manga not found.'}); 
    }
    res.json(manga);
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
