'use strict';

function pathToArr(pathStr) {
  return pathStr.split('.');
}

/**
 * Return an item from a nested tree of immutable structures, selecting the
 * "present" value in the event that any level of the provided structure conforms
 * to Redux's history state shape conventions (see "Implementing Undo History"
 * in the Redux documentation).
 *
 * Test cases to write:
 * - Basic shallow undoable store
 * - Nested undoable store
 * - Store with value "present"
 *
 * @param {Immutable.Map|Immutable.List|Immutable.OrderedMap} structure - An
 * immutable data store exposing the .getIn API
 * @param {string} pathStr - A path string, e.g. "parentProp.childProp"
 * @returns {*} The value of the [present history state of the] specified
 * structure's sub-item at the requested path
 */
function getIn(structure, pathStr) {
  var pathArr = pathToArr(pathStr);
  return pathArr.reduce(function(substructure, pathKey) {
    if (typeof substructure.get !== 'function') {
      return substructure;
    }
    var val = substructure.get(pathKey);
    if (typeof val === 'undefined') {
      return val;
    }
    if (val && val.present) {
      // This state is structured for history: return the present value
      return val.present;
    }
    return val;
  }, structure.present ? structure.present : structure);
}

function setIn(structure, pathStr, value) {
  return structure.setIn(pathToArr(pathStr), value);
}

module.exports = {
  getIn: getIn,
  setIn: setIn
};
