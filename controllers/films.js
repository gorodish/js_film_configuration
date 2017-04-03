//since we don't have a database we'll use our front end models at the moment
var films = require('../client/src/models/films')();
var Film = require('../client/src/models/film');
var Review = require('../client/src/models/review');

var express = require('express');
var filmRouter = express.Router();

var bodyParser = require('body-parser');
filmRouter.use(bodyParser.json());
filmRouter.use(bodyParser.urlencoded({extended: true}));

filmRouter.get('/', function(req, res) {
  res.json(films);
});

filmRouter.get('/:id', function(req, res) {
  res.json({data: films[req.params.id]});
});

filmRouter.put('/:id', function(req, res) {
  var film = new Film({
    title: req.body.title,
    actors: req.body.actors
  });
  films[req.params.id] = film;
  res.json({data: films});
});

filmRouter.post('/', function(req, res){
  var newFilm = {
    title: req.body.title,
    actors: req.body.actors
  }
  var options = new Film(newFilm);
  films.push(options);
  res.json({data: films});
});

filmRouter.delete('/:id', function(req, res) {
  films.splice(req.params.id, 1);
  res.json({data: films});
});


module.exports = filmRouter;