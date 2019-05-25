var bowerfiles 	= require('./bowerFiles');
var srcfiles 		= require('./srcFiles');
var serverFiles = require('./serverFiles');
var sysdirs 		= require('./sysDirs');


module.exports = {
	
	//root dirs
	baseDirs : {
		app : './',
		dist: './dist/'
	},
	
	//public dir and subDirs
	publicDirs : {
		root 		: 'public/',
		js			: 'public/js/',
		css 		: 'public/css/',
		images 	: 'public/images/',
		favico 	: 'public/',
		fonts 	: 'public/fonts/'
	},
	
	//app files 
	appfiles : {	
		app : {
			js				: srcfiles.app,
			templates	: srcfiles.templates,
			sass 			: srcfiles.sass,
			images 		: srcfiles.images,
			favico		: srcfiles.favico
		},
		vendor: {
			js		: bowerfiles.bowerComponentsJS, 
			css		: bowerfiles.bowerComponentsCSS,
			fonts : bowerfiles.bowerComponentsFONTS,
			noConcat : {
				js 	: bowerfiles.bowerComponentsNoConcatJS
			}
		},
		index : serverFiles.index
	},
	
	srcRootDir : srcfiles.srcRootDir,
	
	concatFilenames : {
		app : {
			js 			: 'appBundle.js',
			css			: 'appBundle.css',
			cssMap 	: 'appBundleCSS.map',
			jsMap 	: 'appBundleJS.map'
		},
		vendor: {
			js 		: 'vendorBundle.js',
			css 	: 'vendorBundle.css'			
		},
	},

	startupScript : 'server.js',
	
	sysDirs :  {
		serverJS 		: sysdirs.serverFiles.ejs,
		serverEJS		: sysdirs.serverFiles.js,
		nodeModules : sysdirs.nodeModules,
		packageJSON : sysdirs.packageJSON,
		readme			: sysdirs.readme,
		
		serverRootDir 			: sysdirs.serverRootDir,
		nodeModulesRootDir 	: sysdirs.nodeModulesRootDir,
		publicRootDir 			: sysdirs.publicRootDir,	
	}
}