;(function(){
	'user strict';
	
	angular
		.module('app.common.user.Service', [])
		.factory('User', User);
		
		User.$inject = []; 
		
		function User(){
			var service = {
				isAuthenticated : false,
				id: '',
				firstName: '',
				lastName: '',
				language: '',
				dateRegistration: null					
			};
			return service;
			
				
		}
})();