/**
 * index view : main controller
 */
 ;(function(){
	 
	'use strict';
	 
	angular
		.module('app.index.main.Controller', [])
		.controller('IndexMainController', IndexMainController);
		
		IndexMainController.$inject = [
				'CommonUserAuthentificationService',
				'User'
				];		
		function IndexMainController(CommonUserAuthentificationService, User){
			
			/* jshint validthis: true */
			var IndexMainCtrl = this;
			
			IndexMainCtrl.isAnExample = true;
			IndexMainCtrl.currentUser = User;
			
			
			
			
			
			// function currentUser(){
			// 	CommonUserAuthentificationService
			// 		.get({id: 0})
			// 		.$promise.then(function(){
			// 		
			// 	});
			//}
			
		}
		
		
 })();
