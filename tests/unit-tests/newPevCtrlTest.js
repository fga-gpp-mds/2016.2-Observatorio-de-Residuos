describe('newPevCtrl', function () {
    var $controller;
    var $scope = {};
    var $rootScope = {};
    var $httpBackend;
    var $ionicHistory;
    var factoryPEV;

    beforeEach(function() {
        module('starter');
        module(function($provide) {
            $provide.value('NgMap', {
                getGeoLocation: function() {
                    return {
                        then: function(map) {
                            return map({
                                lat: function() {return "-30"},
                                lng: function() {return "-30"}
                            })
                        }
                    }
                }
            });
        });
    });
    beforeEach(inject(function (_$controller_, _$httpBackend_, $injector, _factoryPEV_, _$ionicHistory_, _$rootScope_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        URL = $injector.get('URL');
        $httpBackend.when('GET', /\.html$/).respond('');
        factoryPEV = _factoryPEV_;
        $ionicHistory = _$ionicHistory_;
        $rootScope = _$rootScope_;
    }))


    beforeEach(function () {
        var controller = $controller('newPevCtrl', {$scope: $scope, $ionicHistory:$ionicHistory});
    });

    describe('createPEV', function () {
        var pev = {name:'Leroy Merlin', paper:true, plastic:true, metal:true, glass:true, comment:'Apenas um comentário', latitude:'-50.2153', longitude:'100.2141'}
         it ('should create a new pev and push to database', function () {
             $httpBackend.expectPOST(URL + '/pevs/create', pev).respond(201);
             $scope.createPEV(pev);
             $httpBackend.flush();
             expect($scope.pev).toEqual({});
         });

        it ('should not create a new pev and not push to database', function () {
            var data = "error message";
            $httpBackend.expectPOST(URL + '/pevs/create', pev).respond(400, data);
            $scope.createPEV(pev);
            $httpBackend.flush();
        });
    });
});
