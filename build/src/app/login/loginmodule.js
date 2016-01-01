(function () {
    angular.module('loginmodule', ['dashboardmodule'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.login.dashboard', {
                    url: "/dashboard?user",
                    views: {
                        '@': {
                            templateUrl: "/src/app/dashboard/dashboard_new.html",
                            controller: "dashboardcontroller",
                            controllerAs: "dashboardscope",
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        })
        .controller("logincontroller", ['$firebase', "$firebaseAuth", "$state", '$window',
            function ($firebase, $firebaseAuth, $state, $window) {

                var loginscope = this;
                var ref = new Firebase('https://testappforusers.firebaseio.com');
                var auth = $firebaseAuth(ref);

                loginscope.newUser = {
                    email: '',
                    accTwitter: '',
                    accFacebook: '',
                    accGooglePlus: '',
                    firstname: '',
                    lastname: '',
                    phone: '',
                    address: ''
                };

                loginscope.password = {
                    password: '',
                    confirmpassword: '',
                }
                loginscope.currentUser = { email: '', id: '' };

                loginscope.LoginTo = function () {
                    return gotodashboardpage("974e98b3-0b70-4553-9850-4858cce78482", $state, $window);
                    // return auth.$authWithPassword({
                    //     email: loginscope.newUser.email,
                    //     password: loginscope.password
                    // }).then(function (authData) {
                    //     gotodashboardpage(authData.uid, $state, $window);
                    // }).catch(function (error) {
                    //     //console.error("Authentication failed:", error.message);
                    //     alert("login failed :- " + error.message);
                    // });
                }

                loginscope.register = function () {
                    if (loginscope.password != loginscope.confirmpassword) {
                        return alert('Passwords dont match');
                    }
                    else {
                        return auth.$createUser({
                            email: loginscope.newUser.email,
                            password: loginscope.password
                        }).then(function (user) {
                            setuserinfirabse(loginscope.newUser, user, $firebase, $firebaseAuth);
                            alert("Registered successful");
                        });
                    }
                }
            }])


    function gotodashboardpage(user, $state, $window) {
        console.log(user);
        $state.go('app.login.dashboard',{user:user});
        // var url = "http://" + $window.location.host + "/src/app/dashboard/dashboard.html#" + user.uid;
        // $window.location.href = url;
    }

    function setuserinfirabse(user, userid, $firebase, $firebaseAuth) {
        var firebaseref = new Firebase('https://testappforusers.firebaseio.com/');
        firebaseref.child('users').push({ "uid": userid.uid, "user": user });
    }
})();
