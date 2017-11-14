$("#addDepartment").submit(function(e) {
  e.preventDefault();
  var form = $('#addDepartment')[0],
    formData = new FormData(form);
  var label = ":Department";
  var parameters = {
    "d_name": formData.get('name'),
    "d_desc": formData.get('desc')
  }
  var statement = mergeStatement(label, "name:{d_name},description:{d_desc}");
  session.run(statement, parameters).subscribe({
    onCompleted: function(metadata) {
      $('#addDepartment').trigger("reset");
      updateLabelTable('depTable','Department',depProps);
    }
  });
});

$("#addEmployee").submit(function(e) {
  e.preventDefault();
  var form = $('#addEmployee')[0],
    formData = new FormData(form);
  var label = ":Employee";
  var parameters = {
    "e_fname": formData.get('firstName'),
    "e_surename": formData.get('surename'),
    "e_jobTitle": formData.get('jobTitle')
  }
  var statement = mergeStatement(label, "first_name:{e_fname},surename:{e_surename},job_title:{e_jobTitle}");
  session.run(statement, parameters).subscribe({
    onCompleted: function(metadata) {
      $('#addEmployee').trigger("reset");
      updateLabelTable('empTable','Employee',empProps);
    }
  });
});

$("#addTeam").submit(function(e) {
  e.preventDefault();
  var form = $('#addTeam')[0],
    formData = new FormData(form);
  var label = ":Team";
  var parameters = {"t_name": formData.get('name')};
  var statement = mergeStatement(label, "name:{t_name}");

  session.run(statement, parameters).subscribe({
    onCompleted: function(metadata) {
      $('#addTeam').trigger("reset");
      updateLabelTable('teamTable','Team',teamProps);
      updateSelect('h_team','Team','name');
      updateSelect('a_team','Team','name');
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
      // updateLabelTable('matchTable','Match',matchProps);
    }
  });
});

$("#h_team").change(function() {
  $("#m_loc").val($("#h_team option:selected").text());
});

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
