angular.module('starter.controllers', [])

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
		// console.log("..." + noHape.toString().length);

		var nomerHp = noHape.toString();
		if(nomerHp.length>=3 && nomerHp.length<=4){
			// console.log("..." + noHape.substring(0, 4));

			var kodeSeluler = "0" + nomerHp.substring(0, 4);
			// console.log(kodeSeluler);

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
});