(function(){
   
    angular.module("facebookmodule",[])
    .controller("facebookcontroller",function($stateParams){
        var facebookscope = this;
        facebookscope.passeduserid = $stateParams.userid;
    }) 
})();