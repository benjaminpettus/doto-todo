const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/dotos';
const db = pgp(connectionString);



function getAllDotos(request, response, next){
  db.any('select * from todo')
  .then(function(data) {
    response.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL todos'
      });
  })
  .catch(function(err){
    return next(err);
  });
}

function createTodo(request, response, next){
  db.none('insert into todo(title)' + 'values(${title})', request.body)
    .then(function(){
      response.status(200)
        .json({
          status: 'success',
          message: 'Inserted one todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateTodo(request, response, next){
  db.none('update todo set title=$1, complete=$2 where id=$3',
    [request.body.title, request.body.complete, parseInt(request.params.id)])
    .then(function() {
      response.status(200)
        .json({
          status: 'success',
          message: 'Updated todo'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

function deleteTodo(request, response, next){
  const todoId = parseInt(request.params.id);
  db.result('delete from todo where id=$1', todoId)
    .then(function (result) {
      response.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} todo`
        });
    })
    .catch(function(err){
      return next(err);
    });
}

module.exports = {
getAllDotos: getAllDotos,
createTodo: createTodo,
updateTodo: updateTodo,
deleteTodo: deleteTodo
}
