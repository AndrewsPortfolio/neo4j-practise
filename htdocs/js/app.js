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
  return "MERGE (a" + label + " {" + properties + "})";
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

function updateMatchTable(table, label) {
  $("#" + table + " tr").remove();
  // var statement = "MATCH (m:Match)<-[r:PLAYED]-(t:Team) return distinct m, r, t";
  // var statement = "MATCH (m:Match)<-[r:PLAYED]-(t:Team) return distinct ID(m), m.date, r.score,t.name;";
  var statement = "MATCH p=(m:Match)<-[r:PLAYED]-(t:Team) return distinct p;";

  var matches = [];
  session.run(statement).subscribe({
    onNext: function(record) {
      // console.log(record);
      record.forEach(function(value, index) {
        console.log(value);

      });
    },
    onCompleted: function(metadata) {
      // console.log(metadata);
    }
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

function isItemInArray(array, item, cell) {
    for (var i = 0; i < array.length; i++) {
        if (array[''+ cell +''][i][0] == item) {
            return true;
        }
    }
    return false;
}

$(document).ready(function() {

});
