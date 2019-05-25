/**
 * index view : main controller
 */
 ;(function(){
	 
	'use strict';
	 
	angular
		.module('app.home.main.Controller', [])
		.controller('HomeMainController', HomeMainController);
		
		
		HomeMainController.$inject = [];		
		function HomeMainController(){
			
			/* jshint validthis: true */
			var HomeMainCtrl = this;
			
			HomeMainCtrl.isAnExample = true;
			
			
		}
		
		
 })();
