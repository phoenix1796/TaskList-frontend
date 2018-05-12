<template>
  <div class="hello">
    <div class="container">
    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-xs-6">
								<a href="" class="active" id="login-form-link">Login</a>
							</div>
							<div class="col-xs-6">
								<a href="" id="register-form-link">Register</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form" @submit.prevent="handleLogin" method="post" role="form" style="display: block;">
									<div class="form-group">
										<input type="text" v-model="username" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
									</div>
									<div class="form-group">
										<input type="password" v-model="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<!-- <div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label for="remember"> Remember Me</label>
									</div> -->
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6">
												<input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
											</div>
                      <div class="col-sm-6">
                        <a @click="handleLogout" class="form-control btn btn-login" >Log Out</a>
                      </div>
										</div>
									</div>
									<!-- <div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
													<a href="#" tabindex="5" class="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div>
									</div> -->
								</form>
								<form id="register-form" @submit.prevent="handleRegister" method="post" role="form" style="display: none;">
									<div class="form-group">
										<input type="text" v-model="username" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
									</div>
									<div class="form-group">
										<input type="password" v-model="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group">
										<input type="password" v-model="confirmPassword" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    <div :key="msg.date" v-for="msg in errors" class="alert alert-danger alert-dismissible fade in out">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      {{msg.message}}
    </div>
    <div :key="msg.date" v-for="msg in success" class="alert alert-success alert-dismissible fade in out">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      {{msg.message}}
    </div>
	</div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8080";

export default {
  name: "HelloWorld",
  data: function() {
    return {
      loggedIn: false,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      errors: [],
      success: []
    };
  },
  methods: {
    handleLogout() {
      if (sessionStorage.getItem("token") == null) return;

      this.success.push({
        message: "Logout successfull",
        date: new Date().getMilliseconds().toString()
      });
      sessionStorage.removeItem("token");
      this.loggedIn = false;
    },
    handleRegister() {
      if (this.password != this.confirmPassword) {
        this.errors.push({
          message: "Check again, passwords do not match!",
          date: new Date().getMilliseconds().toString()
        });
        return;
      }
      axios({
        method: "post",
        url: API_URL + "/users/sign-up",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => res.data)
        .then(data => {
          if (data) {
            this.success.push({
              message: "Registered successfully",
              date: new Date().getMilliseconds().toString()
            });
          }
        })
        .catch(err => {
          this.errors.push({
            message: err.message,
            date: new Date().getMilliseconds().toString()
          });
        });
    },
    handleLogin() {
      if (this.username == "" || this.password == "") return;

      let self = this;
      axios({
        method: "post",
        url: API_URL + "/login",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => res.data)
        .then(data => {
          this.success.push({
            message: "Login successfull, headover to Tasks to check auth",
            date: new Date().getMilliseconds().toString()
          });
          sessionStorage.setItem("token", data.token);
          self.loggedIn = true;
        })
        .catch(err => {
          this.errors.push({
            message: err.message,
            date: new Date().getMilliseconds().toString()
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding-top: 90px;
}
.panel-login {
  border-color: #ccc;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
}
.panel-login > .panel-heading {
  color: #00415d;
  background-color: #fff;
  border-color: #fff;
  text-align: center;
}
.panel-login > .panel-heading a {
  text-decoration: none;
  color: #666;
  font-weight: bold;
  font-size: 15px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login > .panel-heading a.active {
  color: #029f5b;
  font-size: 18px;
}
.panel-login > .panel-heading hr {
  margin-top: 10px;
  margin-bottom: 0px;
  clear: both;
  border: 0;
  height: 1px;
  background-image: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
  background-image: -moz-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
  background-image: -ms-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
  background-image: -o-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
}
.panel-login input[type="email"],
.panel-login input[type="password"],
.panel-login input[type="password"] {
  height: 45px;
  border: 1px solid #ddd;
  font-size: 16px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-color: #ccc;
}
.btn-login {
  background-color: #59b2e0;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #59b2e6;
}
.btn-login:hover,
.btn-login:focus {
  color: #fff;
  background-color: #53a3cd;
  border-color: #53a3cd;
}
.forgot-password {
  text-decoration: underline;
  color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
  text-decoration: underline;
  color: #666;
}

.btn-register {
  background-color: #1cb94e;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #1cb94a;
}
.btn-register:hover,
.btn-register:focus {
  color: #fff;
  background-color: #1ca347;
  border-color: #1ca347;
}
</style>
