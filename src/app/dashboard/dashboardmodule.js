(function () {

    angular.module('dashboardmodule', ['accountsmodule'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.login.dashboard.accounts', {
                    url: '',
                    views: {
                        'accounts': {
                            templateUrl: '/src/app/dashboard/accounts/accounts.html',
                            controller: 'accountscontroller',
                            controllerAs: 'accountsscope'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        })

        .controller("dashboardcontroller",
            function ($stateParams, $firebaseObject, $state,$scope) {
                var userid = $stateParams.user;
                var dashboardscope = this;
                dashboardscope.userid = userid;
                dashboardscope.test = "Welcome to dashboard..lets let the users to add new login to site"
                dashboardscope.gotoAccountspage = function (user) {
                    $state.transitionTo('app.login.dashboard.accounts', { user: userid });
                }

                dashboardscope.accountsconfigured = [];
                dashboardscope.accountsconfforusers = [];
            
                //   console.log(accountsscope.accountsconfigured);
                var firebaseref = new Firebase('https://testappforusers.firebaseio.com/Accounts/');
                firebaseref.on("value", function (snapshot) {
                    snapshot.forEach(function (data) {
                        dashboardscope.accountsconfigured.push(data.val());
                    });
                });

                firebaseref = new Firebase('https://testappforusers.firebaseio.com/users/');

                firebaseref.orderByChild("uid").equalTo(dashboardscope.passeduserid).on("value", function (snapshot) {
                    snapshot.forEach(function (data) {
                        var lets = data.val();
                        if (lets.accounts != undefined) {
                            var accountsval = lets.accounts;
                            console.log(accountsval);
                            for (var key in accountsval) {
                                if (accountsval[key]) {
                                    dashboardscope.accountsconfforusers.push(key);
                                    dashboardscope.accountsconfigured.splice(dashboardscope.accountsconfigured.indexOf(key), 1);
                                }
                            }
                        }
                    });
                    $scope.$apply();
                });

            });
})();