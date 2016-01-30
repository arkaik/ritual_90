BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

    pt_game: this,

    init: function (players) {
        this.receivedPlayers = players;
    },

	create: function () {

        this.stage.backgroundColor = '#cc72bc';
        console.log(this.receivedPlayers);
        this.players = [];
        for (var i = 0; i < this.receivedPlayers.length; ++i) {
            var pData = this.receivedPlayers[i];
            var x = (this.world.width/5)*(i+1) + 20;
            var y = this.world.centerY;
            var player = new Player(this, x, y);
            player.setFromData(pData);
            this.add.existing(player);

            this.add.text((this.world.width/5)*(i+1), this.world.height*0.9, pData.username, {font: "24px Consola", fill: "#fff"});
        }
        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

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