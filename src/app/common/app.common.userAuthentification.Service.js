/**
 * user authentification service
 */
;(function(){
	
	'use strict';
	
	angular
		.module('app.common.userAuthentification.Service', [])
		.factory('CommonUserAuthentificationService', CommonUserAuthentificationService);
		
		CommonUserAuthentificationService.$inject = ['$resource'];
		
		function CommonUserAuthentificationService($resource){
		
			return $resource('/api/user/:id', null,
				{
						'update': { method:'PUT' }
				});
				
		}
		
		
})();