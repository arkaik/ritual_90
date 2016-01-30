
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//this.load.json("data","res/data.json");

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar

		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

	    this.load.image('base1', 'res/base1.png');
	    this.load.image('base2', 'res/base2.png');
	    this.load.image('gorra1', 'res/gorra1.png');
	    this.load.image('gorra2', 'res/gorra2.png');
	    this.load.image('pentinatA1', 'res/pentinatA1.png');
	    this.load.image('pentinatA2', 'res/pentinatA2.png');
	    this.load.image('pentinatA3', 'res/pentinatA3.png');
	    this.load.image('tamagochi1', 'res/tamagochi1.png');
	    this.load.image('tamagochi2', 'res/tamagochi2.png');
	    this.load.image('tamagochi3', 'res/tamagochi3.png');
	    this.load.image('tamagochiBase', 'res/tamagochiBase.png');
	    //this.load.image('starfield', 'assets/skies/deep-space.jpg');

	},

	create: function () {

		this.state.start('MainMenu');

	}

};