/**
 * Created by Lenovo1 on 09/02/16.
 */
//(function () {


    var app = angular.module('contactsApp');

    app.factory('dataService',[ '$q' , '$http', '$log',function ($q, $http , $log  ) {
        $log.debug('dataService');



        var dataCache = {},
            defer = $q.defer();

            //contactsPromise = defer.promise;

        return {

            get: function () {

                if(!localStorage.getItem("myContacts") || JSON.parse(localStorage.getItem('myContacts')).contacts.length == 0 ){
                    $http.get('data/contacts').success(function (data, status) {
                        dataCache.contacts = data.contacts;
                        defer.resolve(dataCache);
                        localStorage.setItem('myContacts', JSON.stringify(data));
                        return dataCache;
                    }).error(function (data, status) {
                        $log.error(status, data);
                    });
                }
                else{
                    dataCache = JSON.parse(localStorage.getItem('myContacts'));
                    //return dataCache.contacts;
                }

                return dataCache;
            },

            set: function(person , id){

                var data = JSON.parse(localStorage.getItem('myContacts'));


                $.each(data.contacts, function (inx, contact) {
                    if (contact.id == id) {
                        contact.first_name = person.first_name;
                        contact.last_name = person.last_name;
                        contact.phone = person.phone;
                        localStorage.setItem('myContacts', JSON.stringify(data));

                    }

                    });
            },

            getById: function(id){
                var defer = $q.defer();

                //contactsPromise.then(function (data) {

                    var existingPost = false;
                    var data = JSON.parse(localStorage.getItem('myContacts'));


                    // Filter the data to only the relevant post
                    $.each(data.contacts, function (inx, contact) {

                        if (contact.id == id) {

                            existingPost = true;

                            defer.resolve(contact);

                            // Stop the loop
                            return false;
                        }
                    });

                if (!existingPost) {
                        defer.reject(id);
                    }
                //});

                return defer.promise;
            },

            deleteContact: function(id){

                var data = JSON.parse(localStorage.getItem('myContacts'));
                           data.contacts.splice(id, 1);
                           localStorage.setItem('myContacts', JSON.stringify(data));

            },

            add:function(contact){

                    var data = JSON.parse(localStorage.getItem('myContacts')) || [];
                    var id = Math.floor((Math.random() * 10000) + 1);

                    contact.id = id;

                    if (data > 0) {
                        $.each(data.contacts, function (inx, contact) {
                            while (contact.id == id) {
                                id = Math.floor((Math.random() * 10000) + 1);
                            }
                        });
                    }


                    data.contacts.push(contact);


                    localStorage.setItem('myContacts', JSON.stringify(data));

                }



        }



    }]);

//});