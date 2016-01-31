BasicGame.Intro = function (game) {

	//this.bg;
	//this.player;
	//this.spriteTopRight;
	//this.spriteBottomLeft;
	//this.spriteBottomRight;

};

BasicGame.Intro.prototype = {
	create: function () {

		this.background = this.generalBackgroundSprite = this.add.sprite(0, 0, 'intro');
        this.background.scale.setTo(0.26,0.26);
        this.background.width = this.world.width;
		this.background.height = this.world.height;

		var quit_btn = this.add.button(0,0, "quitButton", this.switchTo('MainMenu'));
        quit_btn.scale.setTo(0.25, 0.25);

        var playBtn = this.add.button(this.world.centerX, this.world.height*0.8, "letsButton", this.switchTo('Sync'));
		playBtn.scale.setTo(0.25,0.25);
		playBtn.anchor.setTo(0.5,0.5);

        this.selAudio = this.add.audio('select');

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
	switchTo: function(statestring)
	{
		var game = this;
		return function()
		{
			game.selAudio.play();
			game.state.start(statestring);
		}
	}
};