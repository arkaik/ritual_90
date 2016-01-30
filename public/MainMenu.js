BasicGame.MainMenu = function (game) {

	//this.bg;
	//this.player;
	//this.spriteTopRight;
	//this.spriteBottomLeft;
	//this.spriteBottomRight;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.stage.backgroundColor = '#0072bc';

		var text = this.add.text(100, 100, "Menu principal", { fill: '#ffffff' });
		//var text = game.add.text(100, 100, phaserJSON.version, { fill: '#ffffff' });
    	text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

	    var toGame = this.add.text(100, 300, "Jugar", { font: '24px Arial', fill: '#000' });
	    toGame.inputEnabled = true;
    	toGame.events.onInputUp.add(this.switchToSync(this));

		var toTama = this.add.text(100, 400, "Tamagotchi", { font: '24px Arial', fill: '#000' });
	    toTama.inputEnabled = true;
    	toTama.events.onInputUp.add(this.switchToTama(this));

	    //this.spriteTopRight = this.add.sprite(this.game.width, 0, 'tetris1');
	    //this.spriteTopRight.anchor.set(1, 0);

	    //this.spriteBottomLeft = this.add.sprite(0, this.game.height, 'tetris2');
	    //this.spriteBottomLeft.anchor.set(0, 1);

	    //this.spriteBottomRight = this.add.sprite(this.game.width, this.game.height, 'tetris3');
	    //this.spriteBottomRight.anchor.set(1, 1);

        //this.spriteMiddle = this.add.sprite(0, 0, 'hotdog');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	resize: function (width, height) {

		/*this.world.forEach(function(item) {
			console.log(item.position.x+", "+item.position.y);
		});*/
		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

	    //this.bg.width = width;
	    //this.bg.height = height;

	    //this.spriteMiddle.x = this.game.world.centerX;
	    //this.spriteMiddle.y = this.game.world.centerY;

	    //this.spriteTopRight.x = this.game.width;
	    //this.spriteBottomLeft.y = this.game.height;

	    //this.spriteBottomRight.x = this.game.width;
	    //this.spriteBottomRight.y = this.game.height;

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