//---------VARIABLES---------//
var showDebug = true;

var codes = {
  'success' : 1,
  'dbError' : 2,
  'inputError' : 3,
  'unknown' : 4
}

var server = {
  'protocol' : 'http://',
  'ip' : '127.0.0.1',
  'port' : '1337'
}

var departments, employees;

//---------FUNCTIONS---------//

//---------DEBUG LOGGING---------//
function logDebug(type, text){if(showDebug){console.log(type + ' : ' + text);}}

//---------EXTRACT DATA---------//
function extractSingleDataVue(data){
  arr = [];
  data.forEach(function(i) {
    arr.push(i._fields[0].properties);
  });
  return arr;
}

function extractData(data, extra = null){
  var arr = [];
  data.forEach(function(data, index) {
    var obj = {};
    if(data._fields[0] != null){
      obj = data._fields[0].properties;
    }
    if(extra != null){
      for (var i = 1; i < extra.length; i++) {
        if(data._fields[i] != null){obj[extra[i]] = data._fields[i].properties;}
      }
    }
    arr.push(obj);
  });
  return arr;
}

//---------CHECK DATA---------//
function errorCheck(error){
  switch (error) {
    case error.success: return true; break;
    case error.dbError: return false; break;
    case error.inputError: return false; break;
    default: return true;
  }
}

//---------CREATE URL---------//
function createUrl(page){
  return (server.protocol + server.ip + ":" + server.port + "/" + page);
}

//---------POPULATE MODAL---------//
function popModel(model, form){
  var obj = {};
  model.forEach(function(prop) {obj[prop] = parameters[prop];});
  return obj;
}

//---------CONVERT FORM OBJECT TO ARRAY---------//
function formToObj(form, model){
  var obj = {};
  model.forEach(function(prop){obj[prop] = form[prop].value;});
  return obj;
}

function searchData(value, field, arr){
    for (var i=0; i < arr.length; i++) {if (arr[i][field] === value) {return arr[i];}}
}

function checkVar(item){
  if (typeof item !== 'undefined') {return false;}
  else{return true;}
}
