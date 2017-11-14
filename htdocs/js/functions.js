function isItemInArray(array, item, cell) {
    for (var i = 0; i < array.length; i++) {
        if (array[''+ cell +''][i][0] == item) {return true;}
    }
    return false;
}

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
  var statement = "MATCH p=(m:Match)<-[r:PLAYED]-(t:Team) return distinct p;";

  var matches = [];
  session.run(statement).subscribe({
    onNext: function(record) {
      record.forEach(function(value, index) {
        console.log(value);
      });
    },
    onCompleted: function(metadata) {}
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

function createUrl(loc, new_url){
  if (loc.protocol === "https:") {new_uri = "wss:";}
  else {new_uri = "ws:";}
  new_uri += "//" + loc.host;
  new_uri += loc.pathname + "/to/ws";
  return new_url;
}
