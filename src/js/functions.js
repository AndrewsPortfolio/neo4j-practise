//---------FUNCTIONS---------//

//---------VARIABLES---------//
var showDebug = true;
var codes = {db_error: 1, data_error: 2, success: 3, failed: 4};

var server = {'ip' : '192.168.0.1','port' : 1337}

//---------DEBUG LOGGING---------//
function logDebug(type, text){if(showDebug){console.log(type + ' : ' + text);}}

//---------SUBMITTING FORMS---------//
function submitForm(form, data, page, modal){
  logDebug('Function', 'submitForm');
  var loc = (server.ip + ":" + server.port + "/" + page);
  logDebug('data', loc);
  $.ajax({type: "POST", url : loc, data: JSON.stringify(data), cache : false, processData: false})
  .done(function(){
    alert("Success.");
  }).fail(function(){
    alert("Sorry. Server unavailable.");
  });
}

//---------CHARACTER COUNT---------//
function charCount(value, count, div){
  logDebug('Function', 'charCount');
  var length = $(value).val().length;
  var remaining = count - length;
  if(remaining <= (count / 5)){$(div).html(remaining + ' characters remaining');}
  else{  $(div).html('');}
}

//---------SHOW ERROR---------//
function messageError(form, message, text){
  $(form).addClass("is-invalid").removeClass("is-valid");
  $(message).addClass("invalid-feedback").removeClass("valid-feedback").html(text);
}

//---------SHOW SUCCESS---------//
function messageSuccess(form, message, text){
  $(form).addClass("is-valid").removeClass("is-invalid");
  $(message).addClass("valid-feedback").removeClass("invalid-feedback").html(text);
}
