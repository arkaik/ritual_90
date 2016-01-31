BasicGame.About = function (game) {

	//this.bg;
	//this.player;
	//this.spriteTopRight;
	//this.spriteBottomLeft;
	//this.spriteBottomRight;

};

BasicGame.About.prototype = {
	create: function () {

		var background = this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        background.scale.setTo(0.26,0.26);

		var quit_btn = this.add.button(0,0, "quitButton", this.switchTo('MainMenu'));
        quit_btn.scale.setTo(0.25, 0.25);

        this.selAudio = this.add.audio('select');

        var aboutText = "Made in Game Jam Barcelona 2016,"+
        "with proud and sweat (and tears, a lot of tears)."+
        "Music by Kevin McLeod and other musicians";
        this.add.text(100,100, aboutText, {font: "20px Lemiesz", fill: "#000"});
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