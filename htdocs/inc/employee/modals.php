<div id="addEmployee" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <form id="addEmployeeForm" name="addEmployeeForm" enctype="multipart/form-data" class="modal-content">
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
            <input  id="e_firstName" name="first_name" type="text" class="form-control" placeholder="First Name">
          </div>
          <div class="col-6">
            <label for="e_surename">Surename</label>
            <input id="e_surename" name="surename" type="text" class="form-control" placeholder="Surename">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_email">Email</label>
            <input id="e_email" name="email" type="email" class="form-control" placeholder="email">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_jobTitle">Job Title</label>
            <input id="e_jobTitle" name="job_title" type="text" class="form-control" placeholder="job title">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="e_dep">Department</label>
            <select class="dep_select form-control" name="department">
                <option v-for="dep in departments">{{dep.name}}</option>
                <!-- <dep-option v-for="dep in departments" v-bind:dep="dep"></dep-option> -->
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <small id="manager" class="form-text text-muted float-right">Assign manager ?</small>
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
