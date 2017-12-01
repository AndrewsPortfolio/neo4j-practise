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

function extractEmployee(data){
  arr = [];
  data.forEach(function(i) {
    var obj = {};
    if(i._fields[0].label == "Employee"){obj = i._fields[0].properties;}
    if(i._fields[1].labels == "Department"){obj.department = i._fields[1].properties;}
    if(i._fields[2].label == "Employee"){obj.manager = i._fields[2].properties;}
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

//---------CONVERT FORM OBJECT TO ARRAY---------//
function formToArray(form){
    var arr = {};
    for(var pair of form.entries()) {arr[pair[0]] = pair[1];}
    return arr;
}

function searchData(value, field, arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i][field] === value) {return arr[i];}
    }
}
