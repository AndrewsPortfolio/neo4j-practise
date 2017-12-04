Vue.component('dep-select', {
  props: {
    deps: {type: Array},
    value: {type: Number},
  },
  template: '<select class="form-control" v-bind:value="value" v-on:change="updateValue($event.target.value)"><option v-for="(dep, i) in deps" v-bind:value="i">{{dep.name}}</option></select>',
  methods: {
    updateValue: function (value) {
      this.$emit('input', Number(value))
    }
  }
});

Vue.component('emp-select', {
  props: {
    emps: {type: Array},
    value: {type: Number},
    set: {type: Number},
  },
  template: '<select class="form-control" ref="input" v-bind:value="value" v-on:change="updateValue($event.target.value)"><option v-for="(emp, i) in emps" v-if="i != set" v-bind:value="i">{{emp.first_name}} {{emp.surename}}</option></select>',
  methods: {
    updateValue: function (value) {
      this.$emit('input', Number(value))
    }
  }
});
