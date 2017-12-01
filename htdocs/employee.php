<!doctype html>
<html>
<?php require 'inc/head.php';?>
<body class="">
  <?php require 'inc/nav.php';?>
  <main id="e_controller" class="fluid-container">
    <section class="jumbotron jumbotron-fluid">
      <div class="container">
        <div class="row">
          <h1 class="display-3">Employees</h1>
        </div>
        <div class="row">
          <p class="lead">this example uses employees and departments as well as managers.</p>
        </div>
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addEmployee">Add Employee</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addDepartment">Add Department</button>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Job Title</th>
                <th scope="col">Manager</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in employees">
                <th scope="row">1</th>
                <td>{{emp.first_name}}</td>
                <td>{{emp.surename}}</td>
                <td>{{emp.email}}</td>
                <td>{{emp.job_title}}</td>
                <td>
                  <div v-if="emp.manager">{{emp.manager}}</div>
                  <div v-else><button type="button" class="btn btn-primary">Assign Manager</button></div>
                </td>
                <td>
                  <div v-if="emp.department">{{emp.department.name}}</div>
                  <div v-else><button  v-on:click="assignDep.employee = emp" type="button" class="btn btn-primary" data-toggle="modal" data-target="#AssignDepartment">Assign Department</button></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <?php require 'inc/employee/modals.php';?>
  </main>
  <?php require 'inc/footer.php';?>
  <?php require 'inc/scripts.php';?>
</body>
</html>
