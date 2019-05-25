/**
 * about login : main controller
 */
 ;(function(){
	'use strict';
	 
	angular
		.module('app.login.main.Controller', [])
		.controller('LoginMainController', LoginMainController);
		
		
		LoginMainController.$inject = ['$timeout', 'toaster'];		
		function LoginMainController($timeout, toaster){
			
			/* jshint validthis: true */
			var LoginMainCtrl = this;
			
			LoginMainCtrl.errorLogin = errorLogin;
			
			
			
			
			
			/**
			 * display a taoster message when login action failed
			 */
			function errorLogin(message){
				if (message) {
					if (message.length > 0) {	    		
						$timeout(function(){
							toaster.pop({
												type: 'error',
												title: 'Authentification failed...',
												body: 'Sorry, login and password are not recognized.',              
												showCloseButton: true
								});
						}, 10);
					}    		
				}
    	}
			
			
		}
		
		
 })();
