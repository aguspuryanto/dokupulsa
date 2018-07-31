$ionicPlatform.registerBackButtonAction(function () {
  if (condition) {
    navigator.app.exitApp();
  } else {
    handle back action!
  }
}, 100);


$ionicPlatform.registerBackButtonAction(function (event) {
  if($state.current.name=="app.home"){
    navigator.app.exitApp(); //<-- remove this line to disable the exit
  }
  else {
    navigator.app.backHistory();
  }
}, 100);

$ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.backView() == null && $ionicHistory.currentView().url != window.localStorage["start_view"]) {
      // Goto start view
      console.log("-> Going to start view instead of exiting");
      $ionicHistory.currentView($ionicHistory.backView()); // to clean history.
      $rootScope.$apply(function() {
        $location.path(window.localStorage["start_view"]);
      });
    } else if ($ionicHistory.backView() == null && $ionicHistory.currentView().url == window.localStorage["start_view"]) {
      console.log("-> Exiting app");
      navigator.app.exitApp();
    } else {
      // Normal back
      console.log("-> Going back");
      $ionicHistory.goBack();
    }
  }, 100);


$ionicHistory.nextViewOptions({        
  disableBack: true,
  historyRoot: true
});