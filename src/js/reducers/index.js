'use strict';
var combineReducers = require('redux-immutable').combineReducers;
var undoable = require('redux-undo').default;

module.exports = combineReducers({
  inspector: undoable(require('./inspector'))
});
