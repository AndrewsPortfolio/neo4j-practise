var employee = new Vue({
  //options
  el : '#e_controller',
  //variables
  data : {
    test_app: 0,
    departments: [],
    employees: [],
    assignDep : {"e":0,"d":0},
    assign : {
      m:{"e":0,"m":0},
      d:{"e":0,"d":0}
    },

  },
  //constructor
  created : function(){
    this.getDepartments();
    this.getEmployees();
  },
  //functions
  methods : {
    //get functions
    getDepartments: function(){
      this.$http.get(createUrl('departments')).then(response => {
        if(errorCheck(response)){
          this.departments = extractData(response.body, null);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    getEmployees: function(){
      this.$http.get(createUrl('Employees')).then(response => {
        if(errorCheck(response)){
          this.employees = extractData(response.body, this.empExtras);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    //add functions
    addDepartment: function(form){
      var data = {"name" : form.target.elements.name.value, "description" : form.target.elements.description.value};
      this.$http.post(createUrl('addDepartment'), data).then(response => {
        if(errorCheck(response)){
          this.departments.push(data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    addEmployee: function(form){
      var data = formToObj(form.target.elements, this.employeeModel)
      Vue.set(data, 'department', this.departments[form.target.elements.department.value])
      this.$http.post(createUrl('addEmployee'), data).then(response => {
        if(errorCheck(response)){
          this.employees.push(data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    //assign functions
    assignDepartment: function(form){
      var data = this.getEmployee(this.assign.d.e);
      Vue.set(data, 'department', this.departments[this.assign.d.d])
      this.$http.post(createUrl('assignDepartment'), data).then(response => {
        if(errorCheck(response)){
          Vue.set(this.employees, this.assign.d.e, data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    assignManager: function(form){
      var data = this.employees[this.assign.m.e];
      Vue.set(data, 'manager', this.employees[this.assign.m.m])
      this.$http.post(createUrl('assignManager'), data).then(response => {
        if(errorCheck(response)){
          Vue.set(this.employees, this.assign.m.e, data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    //other functions
    checkVar: function(item){
      if (typeof item !== 'undefined') {return false;}
      else{return true;}
    },
    fullname: function(i){
      if(this.employees[i]){
        return (this.employees[i].first_name + " " + this.employees[i].surename);
      }else{return '';}
    },
    test: function(){
      console.log("assignManager");
      console.log("emp : " + this.assign.m.e);
      console.log("mgr : " + this.assign.m.m);
      console.log("test");
      console.log("test_app : " + this.test_app);
    }
  }
});

//football

var football = new Vue({
  //options
  el : '#e_controller',
  //variables
  data : {
    test_app: 0,
    departments: [],
    matches: [],
    createMatch : {
      h:{"t":0,"s":0},
      a:{"t":0,"s":0}
    },

  },
  //constructor
  created : function(){
    this.getTeams();
  },
  //functions
  methods : {
    //get functions

    getTeams: function(){
      this.$http.get(createUrl('Teams')).then(response => {
        if(errorCheck(response)){
          this.teams = extractData(response.body);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    //add functions
    addTeam: function(form){
      var data = {"name" : form.target.elements.name.value, "description" : form.target.elements.description.value};
      this.$http.post(createUrl('addDepartment'), data).then(response => {
        if(errorCheck(response)){
          this.departments.push(data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    //other functions
    checkVar: function(item){
      if (typeof item !== 'undefined') {return false;}
      else{return true;}
    },
    fullname: function(i){
      if(this.employees[i]){
        return (this.employees[i].first_name + " " + this.employees[i].surename);
      }else{return '';}
    },
    test: function(){
      console.log("assignManager");
      console.log("emp : " + this.assign.m.e);
      console.log("mgr : " + this.assign.m.m);
      console.log("test");
      console.log("test_app : " + this.test_app);
    }
  }
});
