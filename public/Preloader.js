
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

		this.background = this.add.sprite(0, 0, 'intro');
		this.background.width = this.world.width;
		this.background.height = this.world.height;
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
	    this.load.image('tamagotchi1', 'res/tamagotchi1.png');
	    this.load.image('tamagotchi2', 'res/tamagotchi2.png');
	    this.load.image('tamagotchi3', 'res/tamagotchi3.png');
	    this.load.image('tamagotchiBase', 'res/tamagotchiBase.png');
	    this.load.image('tamaA1', 'res/tamaA1.png');
	    this.load.image('tamaA2', 'res/tamaA2.png');
	    this.load.image('tamaB1', 'res/tamaB1.png');
	    this.load.image('tamaB2', 'res/tamaB1.png');
	    this.load.image('tamaC1', 'res/tamaC1.png');
	    this.load.image('tamaC2', 'res/tamaC2.png');
	    this.load.image('tamaFood', 'res/tamaFood.png');
	    this.load.image('pentinatB1', 'res/pentinatB1.png');
	    this.load.image('pentinatB2', 'res/pentinatB2.png');
	    this.load.image('pentinatB3', 'res/pentinatB3.png');
	    this.load.image('samarreta1', 'res/samarreta1.png');
	    this.load.image('samarreta2', 'res/samarreta2.png');
	    this.load.image('samarreta3', 'res/samarreta3.png');
	    this.load.image('samarreta4', 'res/samarreta4.png');
	    this.load.image('samarreta5', 'res/samarreta5.png');
	    this.load.atlasJSONHash('tama_anim1', 'res/tama_anim1.png', 'res/tama_anim1.json');
	    this.load.atlasJSONHash('tama_anim2', 'res/tama_anim2.png', 'res/tama_anim2.json');
	    this.load.atlasJSONHash('tama_anim3', 'res/tama_anim3.png', 'res/tama_anim3.json');
	    this.load.image('pantalons1', 'res/pantalons1.png');
	    this.load.image('pantalons2', 'res/pantalons2.png');
	    this.load.image('pantalons3', 'res/pantalons3.png');
	    this.load.image('pantalons4', 'res/pantalons4.png');
	    this.load.image('aboutButton', 'res/title_screen/aboutBtn.png');
	    this.load.image('playButton', 'res/title_screen/playBtn.png');
	    this.load.image('titleScreenBackground', 'res/title_screen/titleScreenBlank.png');

	   	this.load.image('box', 'res/box.png');
	   	this.load.image('pizza1', 'res/pizza1.png');
		this.load.image('pizza2', 'res/pizza2.png');
		this.load.image('pizza3', 'res/pizza3.png');
		this.load.image('pizza4', 'res/pizza4.png');

		this.load.image('generalBackground', 'res/generalBackground.png');

		this.load.image('retroFont', 'res/font.png');

		



	    //this.load.image('starfield', 'assets/skies/deep-space.jpg');

	},

	create: function () {

		this.state.start('MainMenu');

	}

};