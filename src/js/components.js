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
