var teamProps = ['name'];
var matchProps = ['date', 'location'];

$("#addTeam").submit(function(e) {
  e.preventDefault();
  var form = $('#addDepartment')[0],
    formData = new FormData(form);
  var label = ":Department";
  var parameters = {
    "t_name": formData.get('name')
  }
  var statement = mergeStatement(label, "name:{t_name}");
  session.run(statement, parameters).subscribe({
    onCompleted: function(metadata) {
      $('#addTeam').trigger("reset");
      // updateLabelTable('depTable','Department',depProps);
    }
  });
});

$("#addMatch").submit(function(e) {
  e.preventDefault();
  var form = $('#addMatch')[0], formData = new FormData(form);
  var parameters = {
    "m_date":formData.get('m_date'),
    "h_team":formData.get('h_team'),
    "h_score":formData.get('h_score'),
    "a_team":formData.get('a_team'),
    "a_score":formData.get('a_score')
  }

  var matchTeams = "MATCH (h:Team{name:{h_team}}), (a:Team{name:{a_team}}) ";
  var createMatch = "CREATE (m:Match{date:{m_date},location:{h_team}}), "
  var createRel = "(h)-[:PLAYED{score:{h_score}}]->(m)<-[:PLAYED{score:{a_score}}]-(a)";
  var statement = matchTeams + createMatch + createRel;

  console.log(statement);

  session.run(statement, parameters).subscribe({
    onCompleted: function(metadata) {
      $('#addMatch').trigger("reset");
      console.log(metadata);
      //updateLabelTable('matchTable','Match',matchProps);
    }
  });
});

$("#h_team").change(function() {
  $("#m_loc").val($("#h_team option:selected").text());
});

$(document).ready(function() {
  $("#m_loc").val($("#h_team option:selected").text());

  updateSelect('h_team','Team','name');
  updateSelect('a_team','Team','name');
  //updateLabelTable('depTable','Department',depProps);
  //updateLabelTable('empTable','Employee',empProps);
});
