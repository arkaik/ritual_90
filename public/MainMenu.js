BasicGame.MainMenu = function (game) {

	//this.bg;
	//this.player;
	//this.spriteTopRight;
	//this.spriteBottomLeft;
	//this.spriteBottomRight;

};

BasicGame.MainMenu.prototype = {

	create: function () {


		var background = this.add.image(this.world.centerX, this.world.centerY, 'titleScreenBackground');
		background.width = this.world.width;
		background.height = this.world.height;
		background.anchor.set(0.5);

		var text = this.add.text(100, 100, "Menu principal", { fill: '#ffffff' });
		//var text = game.add.text(100, 100, phaserJSON.version, { fill: '#ffffff' });
    	text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

		var toTama = this.add.text(100, 400, "Tamagotchi", { font: '24px Arial', fill: '#000' });
	    toTama.inputEnabled = true;
    	toTama.events.onInputUp.add(this.switchToTama(this));

		var playBtn = this.add.sprite(300, 165, 'playButton');
	    playBtn.anchor.set(0.5);
	    playBtn.inputEnabled = true;
	    playBtn.events.onInputDown.add(this.switchToSync(this), this);
	    playBtn.scale.setTo(0.25, 0.25);

    	var aboutBtn = this.add.sprite(300, 310, 'aboutButton');
	    aboutBtn.anchor.set(0.5);
	    aboutBtn.inputEnabled = true;
	    aboutBtn.events.onInputDown.add(this.switchToSync(this), this);
	    aboutBtn.scale.setTo(0.25, 0.25);
	    

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	shutdown: function()
	{
		/*this.world.forEach(function (item){
			item.destroy();
		})*/
	},

	//Callback pel botó provisional a Game
	switchToSync: function (game)
	{
		return function()
		{
			game.state.start('Sync');
		}
	},
	switchToTama: function (game)
	{
		return function()
		{
			game.state.start('Tamagotchi');
		}
	}
};