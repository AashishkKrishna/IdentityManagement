(function () {
    angular.module("accountsmodule", [])
        .controller("accountscontroller", function ($stateParams, $scope) {
            var accountsscope = this;
            accountsscope.passeduserid = $stateParams.user;

            accountsscope.accountsconfigured = [];
            accountsscope.accountsconfforusers = [];
            
            //   console.log(accountsscope.accountsconfigured);
            var firebaseref = new Firebase('https://testappforusers.firebaseio.com/Accounts/');
            firebaseref.on("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    accountsscope.accountsconfigured.push(data.val());
                });
            });

            firebaseref = new Firebase('https://testappforusers.firebaseio.com/users/');

            firebaseref.orderByChild("uid").equalTo(accountsscope.passeduserid).on("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    var lets = data.val();
                    if (lets.accounts != undefined) {
                        var accountsval = lets.accounts;
                        console.log(accountsval);
                        for (var key in accountsval) {
                            if (accountsval[key]) {
                                accountsscope.accountsconfforusers.push(key);
                                accountsscope.accountsconfigured.splice(accountsscope.accountsconfigured.indexOf(key), 1);
                            }
                        }
                    }
                });
                $scope.$apply();
            });
        });
})();