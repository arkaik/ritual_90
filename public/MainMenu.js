BasicGame.MainMenu = function (game) {

	//this.bg;
	//this.player;
	//this.spriteTopRight;
	//this.spriteBottomLeft;
	//this.spriteBottomRight;

};

BasicGame.MainMenu.prototype = {
	create: function () {
		this.add.text(0,0,"Test", { font: '24px Lemiesz', fill: '#000' });

		var background = this.add.image(this.world.centerX, this.world.centerY, 'titleScreenBackground');
		background.width = this.world.width;
		background.height = this.world.height;
		background.anchor.set(0.5);

		menumusic = this.add.audio('menumusic');
		menumusic.loop = true;
		menumusic.volume += 0.25;
        menumusic.play();

		var playBtn = this.add.button(290, 150, 'playButton', this.switchTo('Intro'));
	    playBtn.anchor.set(0.5);
	    playBtn.scale.setTo(0.25, 0.25);

    	var aboutBtn = this.add.button(290, 260, 'aboutButton', this.switchTo('About'));
	    aboutBtn.anchor.set(0.5);
	    aboutBtn.scale.setTo(0.25, 0.25);
	   
    	this.selAudio = this.add.audio('select');

    	/*
		var toTama = this.add.text(100, 300, "Tamagotchi", { font: '24px Lemiesz', fill: '#000' });
	    toTama.inputEnabled = true;
    	toTama.events.onInputUp.add(this.switchTo('Tamagotchi'));

    	var toPizza = this.add.text(100, 350, "Pizza", { font: '24px Lemiesz', fill: '#000' });
	    toPizza.inputEnabled = true;
    	toPizza.events.onInputUp.add(this.switchTo('Pizza'));
    	var toVhs = this.add.text(300, 400, "VHS", { font: '24px Lemiesz', fill: '#000' });
	    toVhs.inputEnabled = true;
    	toVhs.events.onInputUp.add(this.switchTo('VHS'));

    	var toFloppy = this.add.text(400, 400, "Floppy", { font: '24px Lemiesz', fill: '#000' });
	    toFloppy.inputEnabled = true;
    	toFloppy.events.onInputUp.add(this.switchToFloppy(this));
    	*/

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	shutdown: function()
	{
		this.world.forEach(function (item){
			item.destroy();
		});

		//this.selAudio.destroy();
		//this.menumusic.stop();
		//this.menumusic.destroy();
	},

	//Callback pel botó provisional a Game
	switchTo: function(statestring)
	{
		var game = this;
		return function()
		{
			game.selAudio.play();
			game.time.events.add(Phaser.Timer.SECOND * 0.5, function() { this.state.start(statestring);}, game);
		}
	},

	switchToFloppy: function (game)
	{
		return function()
		{
			game.state.start('Floppy');
		}
	}
};