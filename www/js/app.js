// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngStorage', 'ngCordova', 'ionic-datepicker'])

.run(function($ionicPlatform,$state,$ionicHistory,$ionicPopup,$rootScope,$timeout) {

	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		// if (window.cordova && window.cordova.plugins.Keyboard) {
		if (window.cordova && window.Keyboard) {
			// cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			// cordova.plugins.Keyboard.disableScroll(true);
			window.Keyboard.hideKeyboardAccessoryBar(true);
			window.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
    }

    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
    
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function(event) {
      if (true) { // your check here
        $ionicPopup.confirm({
          title: 'System warning',
          template: 'are you sure you want to exit?'
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
    }, 100);
	
		$ionicPlatform.registerBackButtonAction(function(e) {
      e.preventDefault();
      function showConfirm() {
        var confirmPopup = $ionicPopup.show({
          title : 'Exit AppName?',
          template : 'Are you sure you want to exit AppName?',
          buttons : [{
            text : 'Cancel',
            type : 'button-royal button-outline',
          }, {
          text : 'Ok',
          type : 'button-royal',
          onTap : function() {
            ionic.Platform.exitApp();
          }
          }]
        });
      };
     
      // Is there a page to go back to?
      if ($ionicHistory.backView()) {
        // Go back in history
        $ionicHistory.backView().go();
      } else {
        // This is the last page: Show confirmation popup
        showConfirm();
      }
     
      return false;
    }, 999);

    // To Disable Back in Entire App
    $ionicPlatform.registerBackButtonAction(function(){
      event.preventDefault();
    }, 100);

    // To Conditionally Disable Back
    $ionicPlatform.registerBackButtonAction(function(){
      if($ionicHistory.currentStateName === 'app.search'){
        event.preventDefault();
      }else{
        $ionicHistory.goBack();
      }
    }, 100);
    
  });
  
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, ionicDatePickerProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.pulsa', {
      url: '/pulsa',
      views: {
        'menuContent': {
          templateUrl: 'templates/pulsa.html',
          controller: 'PulsaCtrl'
        }
      }
    })

  .state('app.paket', {
      url: '/paket',
      views: {
        'menuContent': {
          templateUrl: 'templates/data.html',
          controller: 'PaketdataCtrl'
        }
      }
    })

  .state('app.plnpra', {
      url: '/plnpra',
      views: {
        'menuContent': {
          templateUrl: 'templates/plnpra.html',
          controller: 'PlntokenCtrl'
        }
      }
    })

  .state('app.pembelian', {
      url: '/pulsa/pembelian/:product_id/:target',
      views: {
        'menuContent': {
          templateUrl: 'templates/pembelian.html',
          controller: 'BeliPulsaCtrl'
        }
      }
    })

  .state('app.paketdata', {
      url: '/paketdata/:product_id/:target',
      views: {
        'menuContent': {
          templateUrl: 'templates/pembelian.html',
          controller: 'BeliPaketdataCtrl'
        }
      }
    })

    .state('app.token', {
        url: '/token/:product_id/:target',
        views: {
          'menuContent': {
            templateUrl: 'templates/pembelian.html',
            controller: 'BeliTokenCtrl'
          }
        }
      })

  .state('app.bayar', {
      url: '/bayar/:id/:product_id/:target',
      views: {
        'menuContent': {
          templateUrl: 'templates/bayar.html',
          controller: 'PaymentCtrl'
        }
      }
    })

  .state('app.payconfirm', {
      url: '/payconfirm/:product_id/:target',
      views: {
        'menuContent': {
          templateUrl: 'templates/payconfirm.html',
          controller: 'PayconfirmCtrl'
        }
      }
    })

    .state('app.history', {
        url: '/history',
        views: {
          'menuContent': {
            templateUrl: 'templates/history.html',
            controller: 'HistoryCtrl'
          }
        }
      })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          // controller: 'HomeCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/search');
  
	//Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // $httpProvider.defaults.headers.common["Accept"] = "application/json";
  // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  
  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: 'Select a Date',
    setLabel: 'Set',
    todayLabel: 'Today',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    to: new Date(2018, 8, 1),
    showTodayButton: true,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
})

.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})

.factory('featuresData', function ($http) {
	return{          
		/* doCrossDomainGet: function() {
			return $http({ url:'http://vaganzatravel.com/', method: 'GET' })
        } */
		
		GetSaldo: function() {
			return $http.get("http://vaganzatravel.com/pulsa/ceksaldo.php", {cache: true});
		},
		GetHistory: function() {
			return $http.get("http://vaganzatravel.com/pulsa/history.php", {cache: true});
		},
		GetProduct: function(id) {
			return $http.get("http://vaganzatravel.com/pulsa/pembelian.php?product_id=" + id, {cache: true});
		},
		GetTransaksi: function(datatrx) {
			return $http.get("http://vaganzatravel.com/pulsa/transaksi.php", {params:datatrx, cache: true});
		}
    }
});
