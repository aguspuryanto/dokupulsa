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

.controller('HomeCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup, $localStorage, $ionicGesture, $ionicPlatform, $location, $ionicHistory, $interval) {

	// $ionicPlatform.registerBackButtonAction(function() {
	// 	if ($location.path() === "/search") {
	// 	  navigator.app.exitApp();
	// 	// console.log("Anda keluar dari Aplikasi");
	// 	}
	// 	else {
	// 	  $ionicHistory.goBack();
	// 	}
	// }, 100);

	$scope.options = {
		autoplay: 2500,
		loop: false,
		// effect: 'fade',
		speed: 1000,
		slidesPerView: 1,
		centeredSlides: true
	}
  
	$scope.counts = {
		swipe : 0,
		tap : 0,
		doubletap : 0,
		hold : 0
	};
  
	$scope.reportTap = function(tapType){
		// alert(tapType + " reported");
		// alert('you tapped me!');
		$scope.counts[tapType]++;
	};
  
	$scope.gesture = {
		used: ''
	};  

	$scope.onGesture = function(gesture) {
		console.log(gesture);
		$scope.gesture.used = gesture;
	}

	/* var element = angular.element(document.querySelector('#content'));   
		$ionicGesture.on('tap', function(e){
			$scope.$apply(function() {
				console.log('Tap');
			$scope.gesture.used = 'Tap';
		})    
	}, element); */

	var ceksaldo = angular.element(document.querySelector('#saldo'));   
	$ionicGesture.on('doubletap', function(e){
		$scope.$apply(function() {
			console.log('doubletap');
			$scope.loadSaldo();
		})    
	}, ceksaldo);
	
	$scope.saldo = 0;
	$scope.loadSaldo = function(){
		if($localStorage.Saldo !== undefined) {
			// console.log( $localStorage.Saldo );
			$scope.saldo = angular.fromJson($localStorage.Saldo);
		} else {
			var url = "http://vaganzatravel.com/pulsa/ceksaldo.php";
			// var trustedUrl = $sce.trustAsResourceUrl(url);
			$http.get(url, { cache: true }).then(function(data) { 
				console.log( data );
				$localStorage.Saldo = angular.toJson(data.data.balance);
				$scope.saldo = angular.fromJson($localStorage.Saldo);
				
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
		}
	}	
	$scope.loadSaldo();

	$interval($scope.loadSaldo(), 1000 * 60 * 60);

	$scope.getFiltered= function(obj, idx){
		//Set a property on the item being repeated with its actual index
		//return true only for every 1st item in 3 items
		return !((obj._index = idx) % 3); 
	}

	$scope.itemProduk = [];
	// console.log("itemProduk:" + JSON.stringify(angular.fromJson($localStorage.categoriProduk)));

	// if($localStorage.categoriProduk !== undefined) {
	// 	$scope.itemProduk = angular.fromJson($localStorage.categoriProduk);
		
	// } else {
		var url = "";
		if(ionic.Platform.isAndroid()){
			url = "/android_asset/www/";
		}
		
		$http.get(url + "categorie.json", { cache: false }).then(function(reply) {
			// console.info("itemOperator: "+JSON.stringify(reply));
			$localStorage.categoriProduk = angular.toJson(reply.data.data);
			$scope.itemProduk = angular.fromJson($localStorage.categoriProduk);
		});
	// }

	$scope.getSubArray = function (start, end) {
		return $scope.itemProduk.slice(start, end);
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
})

.controller('PaketdataCtrl', function($scope, $http, $cacheFactory, $ionicLoading, $ionicPopup, $localStorage, $sessionStorage) {
	
	var TSEL = ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'];
	var ISAT = ['0856', '0857', '0858', '0815', '0816', '0855'];
	var AXIS = ['0831', '0832', '0838'];
	var XL = ['0817', '0818', '0819', '0859', '0877', '0878'];
	var SMART = ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'];
	var THREE = ['0896', '0897', '0898', '0899', '0895'];
	var BOLT = ['999'];
	
	if($localStorage.operatorData !== undefined) {
		$scope.itemOperatorData = angular.fromJson($localStorage.operatorData);
		
	} else {
		$http.get("http://vaganzatravel.com/pulsa/operator.php?product_id=paket", { cache: false }).then(function(reply) {
			console.info("itemOperator: "+JSON.stringify(reply));
			$localStorage.operatorData = angular.toJson(reply.data.data);
			$scope.itemOperatorData = angular.fromJson($localStorage.operatorData);
		});
	}
	// console.log("itemOperatorData: " + JSON.stringify($scope.itemOperatorData));
	
	/* [{
		"product_id": "TSELD",
		"product_name": "TELKOMSEL DATA",
		"prefix": "0811,0812,0813,0821,0822,0823,0852,0853,0851",
		"status": "1"
	},
	{
		"product_id": "TSELFD",
		"product_name": "TELKOMSEL FULL DATA",
		"prefix": "0811,0812,0813,0821,0822,0823,0852,0853,0851",
		"status": "1"
	},
	{
		"product_id": "ISATD",
		"product_name": "INDOSAT DATA",
		"prefix": "0814,0856,0857,0858,0815,0816,0855",
		"status": "1"
	},
	{
		"product_id": "XLD",
		"product_name": "XL PAKET INTERNET",
		"prefix": "0817,0818,0819,0859,0877,0878",
		"status": "1"
	},
	{
		"product_id": "SMARTD",
		"product_name": "SMARTFREN DATA",
		"prefix": "0881,0882,0883,0884,0885,0886,0887,0888,0889",
		"status": "1"
	},
	{
		"product_id": "SMARTMF",
		"product_name": "SMARTFREN MIFI",
		"prefix": "0881,0882,0883,0884,0885,0886,0887,0888,0889",
		"status": "1"
	},
	{
		"product_id": "AXISD",
		"product_name": "AXIS DATA",
		"prefix": "0831,0832,0838",
		"status": "1"
	},
	{
		"product_id": "THREED",
		"product_name": "THREE INTERNET",
		"prefix": "0896,0897,0898,0899,0895",
		"status": "1"
	},
	{
		"product_id": "TAON",
		"product_name": "THREE AKTIVASI AON",
		"prefix": "0896,0897,0898,0899,0895",
		"status": "1"
	},
	{
		"product_id": "AXISAIGO",
		"product_name": "AXIS VOUCHER AIGO",
		"prefix": "0831,0832,0838",
		"status": "1"
	},
	{
		"product_id": "THREEVTRI",
		"product_name": "THREE DATA VTRI",
		"prefix": "0896,0897,0898,0899,0895",
		"status": "1"
	},
	{
		"product_id": "ISATYELLOW",
		"product_name": "INDOSAT YELLOW",
		"prefix": "0814,0856,0857,0858,0815,0816,0855",
		"status": "1"
	},
	{
		"product_id": "ISATFREE",
		"product_name": "INDOSAT FREEDOM",
		"prefix": "0814,0856,0857,0858,0815,0816,0855",
		"status": "1"
	},
	{
		"product_id": "TSELTCASH",
		"product_name": "TELKOMSEL DATA TCASH",
		"prefix": "0811,0812,0813,0821,0822,0823,0852,0853,0851",
		"status": "1"
	},
	{
		"product_id": "TDGETMORE",
		"product_name": "THREE DATA GETMORE",
		"prefix": "0896,0897,0898,0899,0895",
		"status": "1"
	},
	{
		"product_id": "VFT",
		"product_name": "VOUCHER FISIK THREE",
		"prefix": "0896,0897,0898,0899,0895",
		"status": "1"
	},
	{
		"product_id": "AXISAIGOBRONET",
		"product_name": "AXIS VOUCHER AIGO BRONET",
		"prefix": "0831,0832,0838",
		"status": "1"
	},
	{
		"product_id": "AXISAIGOOWSEM",
		"product_name": "AXIS VOUCHER AIGO OWSEM CLUSTER 4G",
		"prefix": "0831,0832,0838",
		"status": "1"
	},
	{
		"product_id": "TSELDB",
		"product_name": "TELKOMSEL DATA BULK",
		"prefix": "0811,0812,0813,0821,0822,0823,0852,0853,0851",
		"status": "1"
	},
	{
		"product_id": "VOCISATD",
		"product_name": "VOUCHER INDOSAT DATA",
		"prefix": "0814,0856,0857,0858,0815,0816,0855",
		"status": "1"
	}] */
	
	$scope.showOperator = '';
	$scope.itemOperator = [];

	$scope.cekNomer = function(noHape){
		// console.log("..." + noHape.toString().length);
		var nomerHp = noHape.toString();
		if(nomerHp.length>=3 && nomerHp.length<=4){
			// console.log("..." + noHape.substring(0, 4));
			var kodeSeluler = "0" + nomerHp.substring(0, 4);
			/* console.log(kodeSeluler);			
			angular.forEach(angular.fromJson($localStorage.itemOperatorData), function(value, key) {
				if(value.prefix==kodeSeluler){
					console.log(value.product_id + " = " + value.product_name);
				}
			}); */
			
			if(TSEL.indexOf(kodeSeluler) != 0){
				$scope.showOperator = "Telkomsel";				
				$ionicLoading.show({
					template: '<ion-spinner></ion-spinner>',
					duration: 3000
				}).then(function(){
					
					if($localStorage.TSELD !== undefined) {
						$scope.itemOperator = angular.fromJson($localStorage.TSELD);
					} else {
					
						$http.get("http://vaganzatravel.com/pulsa/pembelian.php?product_id=TSELD", { cache: false }).then(function(reply) {
							// console.info("itemOperator: "+JSON.stringify(reply));
							$localStorage.TSELD = angular.toJson(reply.data.data);
							$scope.itemOperator = angular.fromJson($localStorage.TSELD);
							
						},function (error) {
							return alertPopup = $ionicPopup.alert({
								title: 'Load data failed!',
								template: 'Please check your internet!'
							});
						});
					}
					$ionicLoading.hide();
				},function (error) {
					return alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
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

.controller('BeliPulsaCtrl', function($scope, $stateParams, $http, $sce, $ionicLoading, $ionicPopup, $localStorage, featuresData) {
	// console.info("product_id: " + $stateParams.product_id);
	// console.info("target: " + $stateParams.target);
	
	$scope.product_id = $stateParams.product_id;
	$scope.target = "0" + $stateParams.target;	
	$scope.saldo = 0;
	$scope.loadSaldo = function(){
		
		if($localStorage.Saldo !== undefined) {
			$scope.saldo = angular.fromJson($localStorage.Saldo);
		} else {
			var url = "http://vaganzatravel.com/pulsa/ceksaldo.php";
			// var trustedUrl = $sce.trustAsResourceUrl(url);
			$http.get(url, { cache: true }).then(function(data) {
				$localStorage.Saldo = angular.toJson(data.data.balance);
				$scope.saldo = angular.fromJson($localStorage.Saldo);
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
		}
	}
	
	$scope.loadSaldo();
	// console.log("localStorage.Saldo:" + angular.fromJson($localStorage.Saldo) );
	
	var TSEL = ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'];
	var ISAT = ['0856', '0857', '0858', '0815', '0816', '0855'];
	var AXIS = ['0831', '0832', '0838'];
	var XL = ['0817', '0818', '0819', '0859', '0877', '0878'];
	var SMART = ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'];
	var THREE = ['0896', '0897', '0898', '0899', '0895'];
	var BOLT = ['999'];
	
	var kodeSeluler = $stateParams.target.substring(0, 4);
	// console.log( "kodeSeluler:" + kodeSeluler );

	$scope.detailTrx = [];
	if(TSEL.indexOf(kodeSeluler) != 0){
		// console.log("TSEL");
		// console.log("localStorage.Telkomsel:" + angular.fromJson($localStorage.Telkomsel) );

		angular.forEach(angular.fromJson($localStorage.Telkomsel), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				// console.log(value.product_id + " = " + value.product_name);
				$scope.detailTrx.push({
					product_id: value.product_id,
					product_name: value.product_name,
					ket: value.ket,
					price: value.price,
					status: value.status,
				});
				// console.info($scope.detailTrx);
			}
		});
	} else if(ISAT.indexOf(kodeSeluler) != -1){
		angular.forEach(angular.fromJson($localStorage.Indosat), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				console.log(value.product_id + " = " + value.product_name);
			}
		});
	}

	$scope.bayarPulsa = function(){
		console.info($scope.detailTrx);
		var url = "http://vaganzatravel.com/pulsa/transaksi.php";
		// var trustedUrl = $sce.trustAsResourceUrl(url);
		var dataTrx = {
			code: $scope.detailTrx[0].product_id,
			target: $scope.target,
			trxid: Math.floor(Math.random()*(999-100+1)+100)
		}
		console.log( dataTrx );
		$state.go(ref.state, params, options);
		
		// $http.post(url, dataTrx).then(function(resp) {
		/* $ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			duration: 3000
		}).then(function(){
			featuresData.GetTransaksi(dataTrx).then(function(resp) {
				console.log(resp);
				if(resp.data.status=="error"){
					return alertPopup = $ionicPopup.alert({
						title: 'Transaksi Gagal!',
						template: resp.data.message
					});
				}
				// $localStorage.Saldo = angular.toJson(data.data.balance);
				// $scope.saldo = angular.fromJson($localStorage.Saldo);
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
			$ionicLoading.hide();
		},function (error) {
			return alertPopup = $ionicPopup.alert({
			// title: 'Login failed!',
				template: 'ERROR: ' + JSON.stringify(error.status)
			});
		}); */
	}
})

.controller('BeliPaketdataCtrl', function($scope, $stateParams, $http, $sce, $ionicLoading, $ionicPopup, $localStorage, featuresData) {
	// console.info("product_id: " + $stateParams.product_id);
	// console.info("target: " + $stateParams.target);
	
	$scope.product_id = $stateParams.product_id;
	$scope.target = "0" + $stateParams.target;
	$scope.saldo = 0;
	$scope.loadSaldo = function(){
		
		if($localStorage.Saldo !== undefined) {
			$scope.saldo = angular.fromJson($localStorage.Saldo);
		} else {
			var url = "http://vaganzatravel.com/pulsa/ceksaldo.php";
			// var trustedUrl = $sce.trustAsResourceUrl(url);
			$http.get(url, { cache: true }).then(function(data) {
				$localStorage.Saldo = angular.toJson(data.data.balance);
				$scope.saldo = angular.fromJson($localStorage.Saldo);
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
		}
	}
	
	$scope.loadSaldo();
	// console.log("localStorage.Saldo:" + angular.fromJson($localStorage.Saldo) );
	
	var TSEL = ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'];
	var ISAT = ['0856', '0857', '0858', '0815', '0816', '0855'];
	var AXIS = ['0831', '0832', '0838'];
	var XL = ['0817', '0818', '0819', '0859', '0877', '0878'];
	var SMART = ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'];
	var THREE = ['0896', '0897', '0898', '0899', '0895'];
	var BOLT = ['999'];
	
	var kodeSeluler = $stateParams.target.substring(0, 4);
	// console.log( "kodeSeluler:" + kodeSeluler );

	$scope.detailTrx = [];
	if(TSEL.indexOf(kodeSeluler) != 0){
		// console.log("TSEL");
		// console.log("localStorage.Telkomsel:" + angular.fromJson($localStorage.Telkomsel) );

		angular.forEach(angular.fromJson($localStorage.TSELD), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				// console.log(value.product_id + " = " + value.product_name);
				$scope.detailTrx.push({
					product_id: value.product_id,
					product_name: value.product_name,
					ket: value.ket,
					price: value.price,
					status: value.status,
				});
				// console.info($scope.detailTrx);
			}
		});
	} else if(ISAT.indexOf(kodeSeluler) != -1){
		angular.forEach(angular.fromJson($localStorage.Indosat), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				console.log(value.product_id + " = " + value.product_name);
			}
		});
	}

	$scope.bayarPulsa = function(){
		console.info($scope.detailTrx);
		var url = "http://vaganzatravel.com/pulsa/transaksi.php";
		// var trustedUrl = $sce.trustAsResourceUrl(url);
		var dataTrx = {
			code: $scope.detailTrx[0].product_id,
			target: $scope.target,
			trxid: Math.floor(Math.random()*(999-100+1)+100)
		}
		console.log( dataTrx );
		// $http.post(url, dataTrx).then(function(resp) {
		$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			duration: 3000
		}).then(function(){
			featuresData.GetTransaksi(dataTrx).then(function(resp) {
				console.log(resp);
				if(resp.data.status=="error"){
					return alertPopup = $ionicPopup.alert({
						title: 'Transaksi Gagal!',
						template: resp.data.message
					});
				}
				// $localStorage.Saldo = angular.toJson(data.data.balance);
				// $scope.saldo = angular.fromJson($localStorage.Saldo);
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
			$ionicLoading.hide();
		},function (error) {
			return alertPopup = $ionicPopup.alert({
			// title: 'Login failed!',
				template: 'ERROR: ' + JSON.stringify(error.status)
			});
		});
	}
})

.controller('BeliTokenCtrl', function($scope, $stateParams, $http, $sce, $ionicLoading, $ionicPopup, $localStorage, featuresData) {
	// console.info("product_id: " + $stateParams.product_id);
	// console.info("target: " + $stateParams.target);
	
	$scope.product_id = $stateParams.product_id;
	$scope.target = "0" + $stateParams.target;
	$scope.saldo = 0;
	$scope.loadSaldo = function(){
		
		if($localStorage.Saldo !== undefined) {
			$scope.saldo = angular.fromJson($localStorage.Saldo);
		} else {
			var url = "http://vaganzatravel.com/pulsa/ceksaldo.php";
			// var trustedUrl = $sce.trustAsResourceUrl(url);
			$http.get(url, { cache: true }).then(function(data) {
				$localStorage.Saldo = angular.toJson(data.data.balance);
				$scope.saldo = angular.fromJson($localStorage.Saldo);
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
		}
	}
	
	$scope.loadSaldo();
	// console.log("localStorage.Saldo:" + angular.fromJson($localStorage.Saldo) );

	$scope.detailTrx = [];
	// console.log("localStorage.Plntoken:" + angular.fromJson($localStorage.Plntoken) );

	angular.forEach(angular.fromJson($localStorage.Plntoken), function(value, key) {
		if(value.product_id==$stateParams.product_id){
			// console.log(value.product_id + " = " + value.product_name);
			$scope.detailTrx.push({
				product_id: value.product_id,
				product_name: value.product_name,
				ket: value.ket,
				price: value.price,
				status: value.status,
			});
			// console.info($scope.detailTrx);
		}
	});
	console.info($scope.detailTrx);

	$scope.bayarPulsa = function(){
		console.info($scope.detailTrx);
		var url = "http://vaganzatravel.com/pulsa/transaksi.php";
		// var trustedUrl = $sce.trustAsResourceUrl(url);
		var dataTrx = {
			code: $scope.detailTrx[0].product_id,
			target: $scope.target,
			trxid: Math.floor(Math.random()*(999-100+1)+100)
		}
		console.log( dataTrx );
		// $http.post(url, dataTrx).then(function(resp) {
		$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			duration: 3000
		}).then(function(){
			featuresData.GetTransaksi(dataTrx).then(function(resp) {
				console.log(resp);
				if(resp.data.status=="error"){
					return alertPopup = $ionicPopup.alert({
						title: 'Transaksi Gagal!',
						template: resp.data.message
					});
				}
				// $localStorage.Saldo = angular.toJson(data.data.balance);
				// $scope.saldo = angular.fromJson($localStorage.Saldo);
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
			$ionicLoading.hide();
		},function (error) {
			return alertPopup = $ionicPopup.alert({
			// title: 'Login failed!',
				template: 'ERROR: ' + JSON.stringify(error.status)
			});
		});
	}
})

.controller('PaymentCtrl', function($scope, $stateParams, $http, $localStorage, $ionicLoading, $ionicPopup, featuresData) {
	// console.info( $stateParams.id );
	$scope.pay_id = $stateParams.id;

	if($stateParams.id==0){
		$scope.namaBank = "Saldo";
		
	} else if($stateParams.id==1){
		$scope.namaBank = "BCA";
		
	} else if($stateParams.id==2){
		$scope.namaBank = "Mandiri";
		
	} else if($stateParams.id==3){
		$scope.namaBank = "BRI";
		
	} else if($stateParams.id==4){
		$scope.namaBank = "BNI";
	}
	
	var TSEL = ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'];
	var ISAT = ['0856', '0857', '0858', '0815', '0816', '0855'];
	var AXIS = ['0831', '0832', '0838'];
	var XL = ['0817', '0818', '0819', '0859', '0877', '0878'];
	var SMART = ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'];
	var THREE = ['0896', '0897', '0898', '0899', '0895'];
	var BOLT = ['999'];
	
	$scope.product_id = $stateParams.product_id;
	$scope.target = $stateParams.target;
	// console.log($stateParams);
	
	var kodeSeluler = $scope.target.substring(0, 4);
	var kodeUnik = $scope.target.substr(-3);
	if(kodeUnik==0){
		kodeUnik = Math.floor(Math.random()*(999-100+1)+100);
	}
	console.log("kodeUnik:" + kodeUnik);
	$scope.saldo = 0;
	$scope.loadSaldo = function(){
		
		if($localStorage.Saldo !== undefined) {
			$scope.saldo = angular.fromJson($localStorage.Saldo);
		} else {
			var url = "http://vaganzatravel.com/pulsa/ceksaldo.php";
			// var trustedUrl = $sce.trustAsResourceUrl(url);
			$http.get(url, { cache: true }).then(function(data) {
				$localStorage.Saldo = angular.toJson(data.data.balance);
				$scope.saldo = angular.fromJson($localStorage.Saldo);
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
		}
	}
	
	$scope.loadSaldo();
	// console.log("localStorage.Saldo:" + angular.fromJson($localStorage.Saldo) );

	$scope.detailTrx = [];

	// Token
	if($scope.product_id.indexOf("PLP") != -1){

		angular.forEach(angular.fromJson($localStorage.Plntoken), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				// console.log(value.product_id + " = " + value.product_name);
				$scope.detailTrx.push({
					product_id: value.product_id,
					product_name: value.product_name,
					ket: value.ket,
					price: value.price,
					status: value.status,
					kode: kodeUnik,
					totprice: parseInt(value.price) + parseInt(kodeUnik),
				});
				// console.info($scope.detailTrx);
			}
		});
		console.info($scope.detailTrx);
	}

	// Pulsa & Paket data
	if(TSEL.indexOf(kodeSeluler) != 0){
		// console.log("TSEL");
		if($scope.product_id.indexOf("HSB") != -1 || $scope.product_id.indexOf("SH") != -1){
			// console.log("localStorage.Telkomsel:" + ($localStorage.Telkomsel) );		
			angular.forEach(angular.fromJson($localStorage.Telkomsel), function(value, key) {
				if(value.product_id==$scope.product_id){
					// console.log(value.product_id + " = " + value.product_name);
					$scope.detailTrx.push({
						product_id: value.product_id,
						product_name: value.product_name,
						ket: value.ket,
						price: value.price,
						totprice: parseInt(value.price) + parseInt(kodeUnik),
						status: value.status,
						kode: kodeUnik
					});
					// console.info($scope.detailTrx);
				}
			});
		}
		if($scope.product_id.indexOf("HSD") != -1){
			// console.log("localStorage.TSELD:" + angular.fromJson($localStorage.TSELD) );		
			angular.forEach(angular.fromJson($localStorage.TSELD), function(value, key) {
				if(value.product_id==$scope.product_id){
					// console.log(value.product_id + " = " + value.product_name);
					$scope.detailTrx.push({
						product_id: value.product_id,
						product_name: value.product_name,
						ket: value.ket,
						price: value.price,
						totprice: parseInt(value.price) + parseInt(kodeUnik),
						status: value.status,
						kode: kodeUnik
					});
					// console.info($scope.detailTrx);
				}
			});
		}
	} else if(ISAT.indexOf(kodeSeluler) != -1){
		angular.forEach(angular.fromJson($localStorage.Indosat), function(value, key) {
			if(value.product_id==$stateParams.product_id){
				console.log(value.product_id + " = " + value.product_name);
			}
		});
	}

	$scope.bayarPulsa = function(){
		console.info($scope.detailTrx);

		var url = "http://vaganzatravel.com/pulsa/transaksi.php";
		// var trustedUrl = $sce.trustAsResourceUrl(url);
		var dataTrx = {
			code: $scope.detailTrx[0].product_id,
			target: $scope.target,
			trxid: Math.floor(Math.random()*(999-100+1)+100)
		}
		console.log( dataTrx );
		// $http.dataTrx(url, dataTrx).then(function(resp) {
		$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			// duration: 3000
		});
			featuresData.GetTransaksi(dataTrx).then(function(resp) {
				console.log(resp); $ionicLoading.hide();

				if(resp.data.status=="error"){
					return alertPopup = $ionicPopup.alert({
						title: 'Transaksi Gagal!',
						template: resp.data.message
					});
				}
			},function (error) {				
				$ionicLoading.hide();
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});

	}

})

.controller('HistoryCtrl', function($scope, $stateParams, $http, $localStorage, $ionicPopup, $ionicLoading, $timeout, featuresData) {
	// document.addEventListener("deviceready", function () {
		$scope.history = [];

		$scope.doRefresh = function() {
			console.log('reload');
			$timeout( function() {
				$localStorage.History = [];				
				$scope.loadHistory();
				// $scope.history = angular.fromJson($localStorage.History);
				console.log( $scope.history );
				$scope.$broadcast('scroll.refreshComplete');    
    		}, 100);
		}

		$scope.loadHistory = function(){
			console.log( "History:" + angular.fromJson($localStorage.History) );
			// if($localStorage.History !== undefined) {
				// console.log( "localStorage: " + $localStorage.History );
				/* if($localStorage.History){
					$localStorage.History = {
						status: "sucess",
						data: [{
							produk: "Tidak Ada Transaksi", target: "", total: "0", status: "--"
						}]
					};
				} */
				// $scope.history = angular.fromJson($localStorage.History);

			// } else {
				// var url = "http://vaganzatravel.com/pulsa/history.php";
				// var trustedUrl = $sce.trustAsResourceUrl(url);
				// $http.get(url, { cache: true }).then(function(resp) {

				$ionicLoading.show({
					template: '<ion-spinner icon="spiral"></ion-spinner>',
				});

				featuresData.GetHistory().then(function(resp) {
					// console.log(resp.data);					
					$localStorage.History = angular.toJson(resp.data);
					$scope.history = angular.fromJson($localStorage.History);
					
					$ionicLoading.hide();
				},function (error) {
					$ionicLoading.hide();
					
					return alertPopup = $ionicPopup.alert({
						title: 'Load data failed!',
						template: 'Please check your internet!'
					});

					// https://www.gajotres.net/how-to-show-different-native-modal-windows-in-ionic-framework/
					// https://www.gajotres.net/how-to-show-different-native-modal-windows-in-ionic-framework/2/

					// $cordovaToast.show("Load data failed!", 'short', 'center')
					// .then(function(success) {
					// 	console.log('Success');
					// }, function (error) {
					// 	console.log('Error');
					// });
				});

			// }
		}
		
		$scope.loadHistory();

	// }, false);
	
})

.controller('cekTagihanPlnCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup, $localStorage){
	console.log( "cekTagihanPlnCtrl: " + $stateParams );

	$scope.nopel = "";

	$scope.cekTagihanPln = function(nopel){
		$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>',
			duration: 3000
		}).then(function(){
			console.log ("No Pelanggan: " + nopel);
			$ionicLoading.hide();
		});
	};
	// showTagihanPln
})

.controller('PlntokenCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup, $localStorage) {
	// console.log( "PlntokenCtrl: " + $stateParams );

	$ionicLoading.show({
		template: '<ion-spinner></ion-spinner>',
		duration: 3000
	}).then(function(){
		
		if($localStorage.Plntoken !== undefined) {
			$scope.itemOperator = angular.fromJson($localStorage.Plntoken);
		} else {
			$http.get("http://vaganzatravel.com/pulsa/pembelian.php?product_id=PLNPRA", { cache: false }).then(function(reply) {
				// console.info("itemOperator: "+JSON.stringify(reply));
				// window.localStorage["TSEL"] = angular.toJson(reply.data.data);
				$localStorage.Plntoken = angular.toJson(reply.data.data);
				$scope.itemOperator = angular.fromJson($localStorage.Plntoken);
				
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
		}
		$ionicLoading.hide();
	},function (error) {
		return alertPopup = $ionicPopup.alert({
			// title: 'Login failed!',
			template: 'ERROR: ' + JSON.stringify(error.status)
		});
	});
})

.controller('BpjsCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup, $localStorage) {
	// console.log( "BpjsCtrl: " + $stateParams );

	$ionicLoading.show({
		template: '<ion-spinner></ion-spinner>',
		duration: 3000
	}).then(function(){
		// $localStorage.bpjs = [];
		
		// if($localStorage.bpjs !== undefined) {
		// 	$scope.itemOperator = angular.fromJson($localStorage.bpjs);
		// } else {
			$http.get("http://vaganzatravel.com/pulsa/pembayaran.php?product_id=BPJS", { cache: false }).then(function(reply) {
				// console.info("itemOperator: "+JSON.stringify(reply));
				// window.localStorage["TSEL"] = angular.toJson(reply.data.data);
				// $localStorage.bpjs = angular.toJson(reply.data.data);

				// var produkBpjs = reply.data.data;
				// produkBpjs.push({
				// 	product_id: "BPJSTK",
				// 	product_name: "BPJS TENAGA KERJA",
				// 	markup_api: 0,
				// 	fee: 0,
				// 	status: 0
				// });

				// console.log(produkBpjs);
				
				// $scope.itemBpjs = angular.fromJson(reply.data.data);
				
			},function (error) {
				return alertPopup = $ionicPopup.alert({
					title: 'Load data failed!',
					template: 'Please check your internet!'
				});
			});
		// }
		$ionicLoading.hide();
	},function (error) {
		return alertPopup = $ionicPopup.alert({
			// title: 'Login failed!',
			template: 'ERROR: ' + JSON.stringify(error.status)
		});
	});
})

.controller('PayconfirmCtrl', function($scope, $stateParams) {
	console.log( "PayconfirmCtrl: " + $stateParams );
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
