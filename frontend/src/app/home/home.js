angular.module( 'ng-smartsuitcase.home', ['ui.router.state'])
.config(function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/home.tpl.html'
			}
		},
		data:{ pageTitle: 'Home' }
	});
})
/**
 * Home controller
 */
.controller( 'HomeCtrl', ['$scope', '$stateParams', function HomeController( $scope, $stateParams ) {


}])
;
