var db = require('../db/config');
var term = {};

term.getAll = function(req,res,next){
    db.manyOrNone("SELECT * FROM terms;")
    .then(function(result){
        res.locals.term = result;
        console.log(result);
        next();
    })
    .catch(function(error){
        console.log(error);
    })
}

term.find = function(req,res,next){
    var id = req.params.id;
    db.one("SELECT * FROM terms WHERE id=$1;" , [id])
    .then(function(result){
        res.locals.term = result;

        next();
    })
    .catch(function(error){
        console.log(error);
    })
}

term.create = function(req,res,next){
    var termData = {
        name : req.body.name,
        definition : req.body.definition
    }
    console.log( 'TERMDATA: ',termData);
    db.one(`INSERT INTO terms(name,definition) VALUES($1,$2) RETURNING id;`, [termData.name , termData.definition])
    .then(function(result){

        res.locals.term_id = result.id;
        next();
    })
    .catch(function(error){

        console.log(error);
    })

}

term.delete = function(req,res,next){
    
db.none('DELETE FROM terms WHERE id=$1;',[req.params.id])

.then(function(){
    console.log('TERM HAS BEEN DELETED');
    next();
})
.catch(function(error){
    console.log(error);
})
}
module.exports = term;