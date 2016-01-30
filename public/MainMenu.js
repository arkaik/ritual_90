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


		var toTama = this.add.text(100, 300, "Tamagotchi", { font: '24px Lemiesz', fill: '#000' });
	    toTama.inputEnabled = true;
    	toTama.events.onInputUp.add(this.switchToTama(this));

    	var toPizza = this.add.text(100, 350, "Pizza", { font: '24px Lemiesz', fill: '#000' });
	    toPizza.inputEnabled = true;
    	toPizza.events.onInputUp.add(this.switchToPizza(this));

		var playBtn = this.add.button(290, 150, 'playButton', this.switchToSync(this));
	    playBtn.anchor.set(0.5);
	    playBtn.scale.setTo(0.25, 0.25);

    	var aboutBtn = this.add.button(290, 260, 'aboutButton', this.switchToSync(this));
	    aboutBtn.anchor.set(0.5);
	    aboutBtn.scale.setTo(0.25, 0.25);
	   
    	this.selAudio = this.add.audio('select');

    	var toVhs = this.add.text(300, 400, "VHS", { font: '24px Lemiesz', fill: '#000' });
	    toVhs.inputEnabled = true;
    	toVhs.events.onInputUp.add(this.switchToVhs(this));

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	shutdown: function()
	{
		this.world.forEach(function (item){
			item.destroy();
		});

		this.selAudio.destroy();
	},

	//Callback pel botó provisional a Game
	switchToSync: function (game)
	{
		return function()
		{
			game.selAudio.play();
			game.state.start('Sync');
		}
		
	},
	switchToTama: function (game)
	{
		return function()
		{
			game.state.start('Tamagotchi');
		}
	},
	
	switchToPizza: function (game)
	{
		return function()
		{
			game.state.start('Pizza');
		}
	},

	switchToVhs: function (game)
	{
		return function()
		{
			game.state.start('Vhs');
		}
	}
};