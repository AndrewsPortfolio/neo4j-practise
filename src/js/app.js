var app = new Vue({
  //options
  el : '#e_controller',
  //variables
  data : {
    test : "this is a test",
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
          console.log(response.body);
          this.departments = extractData(response.body, null);
          console.log(this.departments);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    getEmployees: function(){
      this.$http.get(createUrl('Employees')).then(response => {
        if(errorCheck(response)){
          console.log(response.body);
          this.employees = extractData(response.body, this.empExtras);
          console.log(this.employees);
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
      var data = formToObj(form.target.elements, this.employeeModel);
      data.department = this.departments[form.target.elements.department.value];
      this.$http.post(createUrl('addEmployee'), data).then(response => {
        if(errorCheck(response)){
          this.employees.push(data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    //assign functions
    assignDepartment: function(form){
      var data = formToObj(form.target.elements, this.employeeModel);
      data.department = this.departments[form.target.elements.department.value];
      this.$http.post(createUrl('assignDepartment'), data).then(response => {
        if(errorCheck(response)){
          Vue.set( this.employees, findData(data.email, 'email', this.employees),data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    assignManager: function(form){
      var data = this.getEmployee(this.assign.m.e);
      data.manager = this.getEmployee(this.assign.m.m);
      console.log(data);
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
    getEmployee: function(i){
      return this.employees[i];
    },
    fullname: function(i){
      return (this.employees[i].first_name + " " + this.employees[i].surename);
    }
  }
});
