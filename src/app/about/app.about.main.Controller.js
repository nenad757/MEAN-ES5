/**
 * about view : main controller
 */
 ;(function(){
	'use strict';
	 
	angular
		.module('app.about.main.Controller', [])
		.controller('MainAboutController', MainAboutController);
		
		
		MainAboutController.$inject = [];		
		function MainAboutController(){
			
			/* jshint validthis: true */
			var MainAboutCtrl = this;
			
			MainAboutCtrl.isAnExample = true;
			
			
		}
		
		
 })();
