/**
 * Created by Lenovo1 on 09/02/16.
 */



var app = angular.module('contactsApp');

app.controller("contactsCtrl" , [ '$scope' ,'$location', 'contactsData' ,'dataService',
    function($scope ,$location, contactsData ,dataService ){

    $scope.contacts = contactsData.contacts;

    $scope.person={};

    $scope.click = function(id){
        $location.path(id);
    };

    $scope.delete= function(index){
        $scope.contacts.splice(index , 1);
        dataService.deleteContact(index);
    };

    $scope.add = function(){
        if(Object.keys($scope.person).length === 3){

            $scope.contacts.push($scope.person);
            dataService.add($scope.person);
            $scope.person ={};
        }
    }

}]);

app.controller("contactCtrl" , [ '$scope' ,'$route', 'contactData' , 'dataService',
    function($scope ,$route, contactData , dataService  ) {

    var id = $route.current.params.ID;


    $scope.toContacts = window.location.pathname;

    $scope.contact = contactData;

    $scope.person = {};



    $scope.submit = function(){

        if(!$scope.person.first_name){
            $scope.person.first_name = $scope.contact.first_name;
        }
        if(!$scope.person.last_name){
            $scope.person.last_name = $scope.contact.last_name;
        }
        if(!$scope.person.phone){
            $scope.person.phone = $scope.contact.phone;
        }

        dataService.set($scope.person , id );

    };





    }]);