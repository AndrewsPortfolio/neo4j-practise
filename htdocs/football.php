<!doctype html>
<html>
<?php require 'inc/head.php';?>
<body class="">
  <?php require 'inc/nav.php';?>
  <main id="f_controller" class="fluid-container">
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
          <div class="col">
            <button type="button" class="btn btn-danger" @click="test">console</button>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Tests</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <!--test-->
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Teams</h1>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(team, index) in teams" v-if="teams">
                <th scope="row">{{index}}</th>
                <td>{{team.name}}</td>
                <td>{{team.location}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <?php require 'inc/football/modals.php';?>
  </main>
  <?php require 'inc/footer.php';?>
  <?php require 'inc/scripts.php';?>
</body>
</html>
