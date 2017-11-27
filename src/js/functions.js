//---------FUNCTIONS---------//

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
  'port' : '8080'
}

//---------DEBUG LOGGING---------//
function logDebug(type, text){if(showDebug){console.log(type + ' : ' + text);}}

//---------SUBMITTING FORMS---------//
function submitForm(data, page){
  var loc = createUrl(page);
  $.post( loc, data).done(function( data ) {
    console.log(data);
    switch (data) {
      case codes.success:
        alert('record added');
        $('#' + page + 'Form')[0].reset();
        $('#' + page).modal('hide');
        break;
      case codes.inputError:
        alert('there was an input error');
        break;
      case codes.dbError:
        alert('there was an database error');
        break;
      case codes.unknown:
        alert('there was an unkown error');
        break;
      default:
    }
  }).fail(function(error) {
    alert('there was a url error');
    console.log("error");
  });
}

//---------GET DATA---------//
function getData(page){
  var loc = createUrl(page);
  $.post( loc, data).done(function( data ) {
    console.log(data);
    switch (data) {
      case codes.inputError:
        alert('there was an input error');
        break;
      case codes.dbError:
        alert('there was an database error');
        break;
      case codes.unknown:
        alert('there was an unkown error');
        break;
      default:
        console.log(data);
    }
  }).fail(function(error) {
    alert('there was a url error');
    console.log("error");
  });
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
