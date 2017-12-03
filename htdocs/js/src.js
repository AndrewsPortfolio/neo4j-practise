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

function extractData(data, extra = null){
  var arr = [];
  data.forEach(function(data, index) {
    var obj = {};
    if(data._fields[0] != null){
      obj = data._fields[0].properties;
    }
    if(extra != null){
      for (var i = 0; i < extra.length; i++) {
        if(data._fields[(i + 1)] != null){obj[extra[(i)]] = data._fields[(i + 1)].properties;}
      }
    }
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

//---------POPULATE MODAL---------//
function popModel(model, form){
  var obj = {};
  model.forEach(function(prop) {obj[prop] = parameters[prop];});
  return obj;
}

//---------CONVERT FORM OBJECT TO ARRAY---------//
function formToObj(form, model){
  var obj = {};
  model.forEach(function(prop){obj[prop] = form[prop].value;});
  return obj;
}

function searchData(value, field, arr){
    for (var i=0; i < arr.length; i++) {if (arr[i][field] === value) {return arr[i];}}
}

function findData(value, field, arr){
    for (var i=0; i < arr.length; i++) {if (arr[i][field] === value) {return i;}}
}

function checkVar(item){
  if (typeof item !== 'undefined') {return false;}
  else{return true;}
}

Vue.mixin({
  data: function() {
    return {
      //employee model
      get employeeModel() {
        return [
          'first_name',
          'surename',
          'email',
          'job_title'
        ];
      },
      //optional extras
      get empExtras() {
        return [
          'department',
          'manager'
        ];
      },
      get departmentModel() {
        return [
          'name',
          'description'
        ];
      },
      get depExtras() {
        return [
          'count'
        ];
      }
    }
  }
})

Vue.component('dep-select', {
  props: {
    deps: {type: Array}
  },
  template: '<select class="dep_select form-control"><option v-for="(dep, i) in deps" v-bind:value="i">{{dep.name}}</option></select>'
});

Vue.component('emp-select', {
  props: {
    emps: {type: Array},
    set: {type: Number},
    selected: {type: Number}
  },
  template: '<select v-model="selected" class="emp_select form-control"><option v-for="(emp, i) in emps" v-if="i != set" v-bind:value="i">{{emp.first_name}} {{emp.surename}}</option></select>'
});

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
