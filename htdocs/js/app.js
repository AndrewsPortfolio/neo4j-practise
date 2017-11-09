var authToken = neo4j.v1.auth.basic("neo4j", "neo4j");
var driver = neo4j.v1.driver("bolt://127.0.0.1:7687", authToken, {
  encrypted: false
});

var session = driver.session();

$("#customStatement").submit(function(e) {
  e.preventDefault();
  var form = $('#customStatement')[0], formData = new FormData(form);
  var statement = formData.get('statement');

  session.run(statement).subscribe({
    onNext: function(record) {
      console.log("returned : ");
      console.log(record);
      record.forEach(function(value) {
        console.log(value);
      });
    },
    onCompleted: function(metadata) {
      console.log("completed :");
      console.log(metadata);
    }
  });
});

function mergeStatement(label, properties) {
  return "MERGE (a " + label + " {" + properties + "})";
}

function matchStatement(label) {
  return "Match (a " + label + ") RETURN a";
}

function updateLabelTable(table, label, collumns) {
  $("#" + table + " tr").remove();
  var statement = matchStatement(":" + label + "");
  session.run(statement).subscribe({
    onNext: function(record) {
      record.forEach(function(value, index) {
        var prop = value.properties;
        var markup = "<tr>";
        markup += "<td>" + value.identity.low + "</td><td>";
        collumns.forEach(function(value){
          markup += "<td>" + prop['' + value + ''] + "</td>";
        });
        $("#" + table + " tbody").append(markup);
      });
    },
  });
}

function updateSelect(select, label, text) {
  $("#" + select + " option").remove();
  var statement = matchStatement(":" + label + "");
  session.run(statement).subscribe({
    onNext: function(record) {
      record.forEach(function(value, index) {
        var prop = value.properties;
        $('#' + select + '').append($("<option></option>").attr("value",prop[''+ text +'']).text(prop[''+ text +'']));
      });
    },
  });
}

$(document).ready(function() {

});
