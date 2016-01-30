BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

    pt_game: this,

    init: function () {
        this.receivedPlayers = arguments[0];
        if (arguments.length === 2) {
            var winnerId = arguments[1];
            console.log('The winner is ' + arguments[0][winnerId].username);
        } 
    },

	create: function () {

        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.scale.setTo(0.25,0.25);

        var toMenu = this.add.button(0, 0, "Menu", { font: '24px Lemiesz', fill: '#000' });
        toMenu.inputEnabled = true;
        toMenu.events.onInputUp.add(this.switchToMenu);

        console.log(this.receivedPlayers);
        this.players = [];
        for (var i = 0; i < this.receivedPlayers.length; ++i) {
            var pData = this.receivedPlayers[i];
            var x = (this.world.width/5)*(i+1) + 20;
            var y = this.world.centerY + 80;
            var player = new Player(this, x, y);
            player.setFromData(pData);
            this.add.existing(player);

            this.add.text((this.world.width/5)*(i+1), this.world.height*0.9, pData.username, {font: "24px Consola", fill: "#fff"});
            this.add.text((this.world.width/5)*(i+1), this.world.height*0.9 + 32, pData.score, {font: "24px Consola", fill: "#fff"});
        }

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.wsMeh = this.add.sprite(this.game.width-200, 0, "willSmoothMeh");
        //this.wsMeh.anchor.setTo(0.5,0.5);
        this.wsMeh.scale.setTo(0.2, 0.2);

        socket.on('startMiniGame', function(gameId) {
            pt_game.state.start(games[gameId]);
        });


	},

	update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		//this.avatar.cap.rotation += 0.1;

	},

	quitGame: function () {
        var pt_game = this;
        return function()
        {
    		//	Here you should destroy anything you no longer need.
    		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
            pt_game.avatar.destroy();

    		//	Then let's go back to the main menu.
            pt_game.state.start('MainMenu');
        }

	}

};