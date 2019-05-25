/**
 * application : core modules
 */ 
;(function(){
	'use strict';
	
	angular
		.module(	'app.core', 	
							[						
								'duScroll',
								'ngAnimate',
								'toaster',
								'ngPasswordStrength',
								'validation.match',	
								'ui.bootstrap',
								'ngResource'
							]
				);

})(); 
