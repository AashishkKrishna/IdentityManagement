(function () {
    angular.module('MainModule', ['ui.router', 'firebase', 'loginmodule'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('common', {
                    // abstract: true,
                    views: {
                        "": { templateUrl: '/src/master_layout.html' },
                        'top@common': { templateUrl: '/src/navigation.html' },
                    },
                })
                .state('app', {
                    url: '',
                    parent: 'common',
                    views: {
                        'content@common': { templateUrl: '/src/master.html' },
                    }
                })
                .state('app.login', {
                    url: "",
                    parent: 'common',
                    views: {
                        'content@common': {
                            templateUrl: "/src/app/login/login.html",
                            controller: "logincontroller",
                            controllerAs: "loginscope"
                        }
                    }
                })
                .state('app.register', {
                    url: "",
                    parent: 'common',
                    views: {
                        'content@common': {
                            templateUrl: "/src/app/login/register.html",
                            controller: "logincontroller",
                            controllerAs: "loginscope",
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        });
})();