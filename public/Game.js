BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

    pt_game: this,

    init: function () {
        this.receivedPlayers = arguments[0];
        if (arguments.length === 2) {
            var winnerId = arguments[1];
            this.lastRoundWinner = winnerId;
            console.log('The winner is ' + arguments[0][winnerId].username);
        } 
    },

	create: function () {

        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.width = this.world.width;
        this.generalBackgroundSprite.height = this.world.height;
        this.winSound = this.add.audio('winSound');
        this.loseSound = this.add.audio('loseSound');

        var toMenu = this.add.button(0, 0, "quitButton", this.quitGame());
        toMenu.scale.setTo(0.25,0.25);

        console.log(this.receivedPlayers);
        this.players = [];
        var maxScore = 0;
        var minScore = Infinity;
        for (var i = 0; i < this.receivedPlayers.length; ++i) {
            var pData = this.receivedPlayers[i];
            var x = (this.world.width/5)*(i+1) + 20;
            var y = this.world.centerY + 80;
            var player = new Player(this, x, y);
            player.setFromData(pData);
            this.players.push(player);
            this.add.existing(player);
            if (pData.score > maxScore) maxScore = pData.score;
            if (pData.score < minScore) minScore = pData.score;

            this.add.text((this.world.width/5)*(i+1), this.world.height*0.9, pData.username, {font: '24px Lemiesz', fill: '#000' });
            this.add.text((this.world.width/5)*(i+1), this.world.height*0.9 + 32, pData.score, {font: "24px Lemiesz", fill: "#000"});
            
        }

        if (this.lastRoundWinner != undefined) {
            console.log('last round winner: ' + this.lastRoundWinner);
            var text = this.add.text(this.world.centerX, 40, this.players[this.lastRoundWinner].username + ' won!', {font: "40px Lemiesz", fill: "#000"});
            if (this.lastRoundWinner === myPlayerId) this.winSound.play();
            else this.loseSound.play();
            text.anchor.setTo(0.5, 0.5);
        }
        else console.log('no winner');

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        var w0llSm00thFace = "willSmoothMeh";
        var myScore = this.players[myPlayerId].score;
        if (myScore == minScore && myScore < maxScore) w0llSm00thFace = "willSmoothSad";
        else if (myScore == maxScore && myScore > minScore) w0llSm00thFace = "willSmoothHappy";
        this.godCam = this.add.sprite(this.game.width-300, 0, w0llSm00thFace);
        //this.wsMeh.anchor.setTo(0.5,0.5);
        this.godCam.scale.setTo(0.25, 0.25);

        socket.on('startMiniGame', function(gameId) {
            pt_game.state.start(games[gameId]);
        });

        console.log('Your player id is ' + myPlayerId + '!');
        console.log('YOUR score is... ' + myScore + '!');

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