/**
 * register view : main controller
 */
 ;(function(){
	'use strict';
	 
	angular
		.module('app.register.main.Controller', [])
		.controller('RegisterMainController', RegisterMainController);
		
		
		RegisterMainController.$inject = ['toaster'];		
		function RegisterMainController(toaster){
			
			/* jshint validthis: true */
			var RegisterMainCtrl = this;
			
			RegisterMainCtrl.hello = 'hello';
			
			
		}
		
		
 })();
