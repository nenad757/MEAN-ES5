/* global WOW */
/// <reference path="../../typings/angularjs/angular.d.ts" />
/**
 * application : root
 */ 
;(function(){
	'use strict';
	
	angular
		.module(	'app', 	
							[
								/*shared modules :*/
								'app.core',
								'app.config',
								/*app modules :*/
								'app.common.userAuthentification.Service',
								'app.common.user.Service',
								'app.index.main.Controller',
								'app.home.main.Controller',
								'app.login.main.Controller',
								'app.register.main.Controller'
							]
				); 

	/**
	 * document.ready - angular way
	 * -> init javascript/jquery here 
	 */
	angular
		.element(document)
		.ready(documentReady);
		
	function documentReady(){
		/**
		 * wow.js init
		 */
		new WOW().init(); 
	}

})(); 
