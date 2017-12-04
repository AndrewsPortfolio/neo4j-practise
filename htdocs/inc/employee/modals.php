<div id="addEmployee" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <form id="addEmployeeForm" name="addEmployeeForm" enctype="multipart/form-data" class="modal-content" v-on:submit.prevent="addEmployee">
      <div class="modal-header">
        <h5 class="modal-title">Add Employee</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row form-group">
          <div class="col-6">
            <label for="e_firstName">First Name</label>
            <input name="first_name" type="text" class="form-control" placeholder="First Name">
          </div>
          <div class="col-6">
            <label for="e_surename">Surename</label>
            <input name="surename" type="text" class="form-control" placeholder="Surename">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_email">Email</label>
            <input name="email" type="email" class="form-control" placeholder="email">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_jobTitle">Job Title</label>
            <input name="job_title" type="text" class="form-control" placeholder="job title">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_dep">Department</label>
            <dep-select v-bind:deps="departments"></<dep-select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">Add Employee</button>
      </div>
    </form>
  </div>
</div>

<div id="addDepartment" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <form id="addDepartmentForm" name="addDepartmentForm" v-on:submit.prevent="addDepartment" enctype="multipart/form-data" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Department</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row form-group">
          <div class="col">
            <label for="d_name">Department Name</label>
            <input id="d_name" name="name" type="text" class="form-control" placeholder="Department Name">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="d_desc">Description</label>
            <textarea id="d_desc" name="description" type="text" class="form-control" ></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary">Add Department</button>
      </div>
    </form>
  </div>
</div>

<div id="AssignDepartment" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <form v-if="getEmployee(assign.d.e)" id="AssignDepartmentForm" name="AssignDepartmentForm" v-on:submit.prevent="assignDepartment" enctype="multipart/form-data" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Assign Department</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row form-group">
          <div class="col">
            <label>Name</label>
            <input :value="fullname(assign.d.e)" type="text" class="form-control" readonly>
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_jobTitle">Job Title</label>
            <input v-model="getEmployee(assign.d.e).job_title" name="job_title" class="form-control" readonly>
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_dep">Department</label>
            <dep-select v-model="assign.d.d" v-bind:deps="departments"></<dep-select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary">Assign Department</button>
      </div>
    </form>
  </div>
</div>

<div id="AssignManager" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <form v-if="getEmployee(assign.m.e)" class="modal-content" name="AssignManagerForm" v-on:submit.prevent="assignManager" enctype="multipart/form-data">
      <div class="modal-header">
        <h5 class="modal-title">Assign Manager : </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <div class="row form-group">
          <div class="col">
            <label>Name</label>
            <input :value="fullname(assign.m.e)" type="text" class="form-control" readonly>
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_jobTitle">Job Title</label>
            <input :value="getEmployee(assign.m.e).job_title" class="form-control" readonly>
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_dep">Manager</label>
            <emp-select v-model="assign.m.m" :emps="employees" :set="0"></<emp-select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary">Assign Manager</button>
      </div>
    </form>
  </div>
</div>
