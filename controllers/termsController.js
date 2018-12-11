var express = require('express');
var router = express.Router();

var term = require('../models/term');
router.get('/new', renderNew);
router.get('/',term.getAll,renderIndex);
router.get('/:id' ,term.find, renderShow);
router.post('/',term.create,redirectShow);
router.delete('/:id', term.delete ,redirectIndex);

function renderIndex(req,res){
var mustacheVariables = {
    term: res.locals.term
}
res.render('./terms/index',mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = res.locals.term;

  res.render('./terms/show',mustacheVariables);
}

function renderNew(req,res){
    res.render('./terms/new');
}
function redirectShow(req, res) {
    console.log(req.body);
    res.redirect(`/term/${res.locals.term_id}`);
  }
function redirectIndex(req,res){
    res.redirect('/term');
}
module.exports = router;

