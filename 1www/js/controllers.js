angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('HomeCtrl', function($scope, $stateParams) {

  $scope.options = {
    autoplay: 2500,
    loop: false,
    // effect: 'fade',
    speed: 1000,
    slidesPerView: 1,
    centeredSlides: true
  }

})

.controller('PulsaCtrl', function($scope, $http, $cacheFactory, $ionicLoading, $ionicPopup, $localStorage, $sessionStorage) {
	
	var TSEL = ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'];
	var ISAT = ['0856', '0857', '0858', '0815', '0816', '0855'];
	var AXIS = ['0831', '0832', '0838'];
	var XL = ['0817', '0818', '0819', '0859', '0877', '0878'];
	var SMART = ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'];
	var THREE = ['0896', '0897', '0898', '0899', '0895'];
	var BOLT = ['999'];
	
	$scope.showOperator = '';
	$scope.itemOperator = [];

	$scope.cekNomer = function(noHape){
		if(noHape.length>=4 && noHape.length<=5){
			// console.log("..." + noHape.substring(0, 4));
			var kodeSeluler = noHape.substring(0, 4);
			if(TSEL.indexOf(kodeSeluler) != -1){
				// console.log("TSEL");
				$scope.showOperator = "Telkomsel";
				
				$ionicLoading.show({
					template: '<ion-spinner></ion-spinner>',
					duration: 3000
				}).then(function(){
					
					// Create a new cache with a capacity of 10, LRU Cache (Least Recently Used)
					// https://coderwall.com/p/40axlq/power-up-angular-s-http-service-with-caching
					// var lruCache = $cacheFactory('lruCache', { capacity: 10 });
					
					if($localStorage.Telkomsel !== undefined) {
						// $scope.itemOperator = angular.fromJson(window.localStorage["TSEL"]);
						$scope.itemOperator = angular.fromJson($localStorage.Telkomsel);
					} else {
					// if (angular.isUndefined($scope.cache.get("Telkomsel"))) {
						// $scope.cache = $cacheFactory('TSEL');
						$http.get("http://vaganzatravel.com/pulsa/pembelian.php?product_id=TSEL", { cache: false }).then(function(reply) {
							// console.info("itemOperator: "+JSON.stringify(reply));
							// window.localStorage["TSEL"] = angular.toJson(reply.data.data);
							$localStorage.Telkomsel = angular.toJson(reply.data.data);
							// $scope.itemOperator = reply.data.data;
							$scope.itemOperator = angular.fromJson($localStorage.Telkomsel);
							
						},function (error) {
							return alertPopup = $ionicPopup.alert({
								title: 'Load data failed!',
								template: 'Please check your internet!'
							});
						});
						// $scope.cache.put("Telkomsel", $scope.itemOperator);
					// }
					}
					$ionicLoading.hide();
				},function (error) {
					return alertPopup = $ionicPopup.alert({
						// title: 'Login failed!',
						template: 'ERROR: ' + JSON.stringify(error.status)
					});
				});
				
			}else if(ISAT.indexOf(kodeSeluler) != -1){
				console.log("ISAT");
				$scope.showOperator = "Indosat";
			}else if(AXIS.indexOf(kodeSeluler) != -1){
				console.log("AXIS");
				$scope.showOperator = "AXIS";
			}else if(XL.indexOf(kodeSeluler) != -1){
				console.log("XL");
				$scope.showOperator = "XL";
			}else if(SMART.indexOf(kodeSeluler) != -1){
				console.log("SMART");
				$scope.showOperator = "SMART";
			}else if(THREE.indexOf(kodeSeluler) != -1){
				console.log("THREE");
				$scope.showOperator = "THREE";
			}else if(BOLT.indexOf(kodeSeluler) != -1){
				console.log("BOLT");
				$scope.showOperator = "BOLT";
			}

		}
	}
})

.controller('BeliPulsaCtrl', function($scope, $stateParams, $localStorage, $sessionStorage) {
	console.info("product_id: " + $stateParams.product_id);
	console.info("target: " + $stateParams.target);
	
	var TSEL = ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'];
	var ISAT = ['0856', '0857', '0858', '0815', '0816', '0855'];
	var AXIS = ['0831', '0832', '0838'];
	var XL = ['0817', '0818', '0819', '0859', '0877', '0878'];
	var SMART = ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'];
	var THREE = ['0896', '0897', '0898', '0899', '0895'];
	var BOLT = ['999'];
	
	var kodeSeluler = $stateParams.target.substring(0, 4);
	
	$scope.detailTrx = [];
	if(TSEL.indexOf(kodeSeluler) != -1){
		// console.log("TSEL");
		angular.forEach(angular.fromJson($localStorage.Telkomsel), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				console.log(value.product_id + " = " + value.product_name);
				$scope.detailTrx.push({
					product_id: value.product_id,
					product_name: value.product_name,
					ket: value.ket,
					price: value.price,
					status: value.status,
				});
				console.info($scope.detailTrx);
			}
		});
	} else if(ISAT.indexOf(kodeSeluler) != -1){
		angular.forEach(angular.fromJson($localStorage.Indosat), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				console.log(value.product_id + " = " + value.product_name);
			}
		});
	}
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
