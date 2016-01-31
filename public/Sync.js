BasicGame.Sync = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    //this.game;		//	a reference to the currently running game
    //this.add;		//	used to add sprites, text, groups, etc
    //this.camera;	//	a reference to the game camera
    //this.cache;		//	the game cache
    //this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    //this.load;		//	for preloading assets
    //this.math;		//	lots of useful common math operations
    //this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    //this.stage;		//	the game stage
    //this.time;		//	the clock
    //this.tweens;    //  the tween manager
    //this.state;	    //	the state manager
    //this.world;		//	the game world
    //this.particles;	//	the particle manager
    //this.physics;	//	the physics manager
    //this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.avatar; // Avatar del jugador principal
};

BasicGame.Sync.prototype = {
    
    pt_game: this,

    //playerId: undefined,
    preload: function () {
        this.intro = this.add.sprite(0,0,'intro');
        this.intro.scale.setTo(0.26,0.26);
    },

	create: function () {

        
        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.scale.setTo(0.26,0.26);
        
        pt_game = this;
        var self = this;
        this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        this.add.existing(this.avatar);

        var toMenu = this.add.button(0, 0, "quitButton", this.quitGame());
        toMenu.scale.setTo(0.25,0.25);
        toMenu.inputEnabled = true;
        toMenu.events.onInputUp.add(this.quitGame());


        var messageText = this.add.text(this.game.width/2, 50, "Looking for opponents...", { font: '24px Lemiesz', fill: '#000' });
        messageText.anchor.setTo(0.5, 0.5);

        /*var next_text = this.add.text(0, 200, "Next", { font: '24px Arial', fill: '#fff' });
        next_text.inputEnabled = true;
        next_text.events.onInputUp.add(this.quitGame());*/

        socket = io.connect('http://localhost:4242');
        socket.on('connect', function () {
            console.log('user connected!');
            var username = prompt("Enter your username:") || "anon";
            var data = {
                username: username,
                headSpriteId: self.avatar.id_cap,
                shirtSpriteId: self.avatar.id_tshirt,
                legsSpriteId: self.avatar.id_jeans,
                bodySpriteId: self.avatar.id_base
            };
            socket.emit('userConnected', data);
        });

        socket.on('connectionACK', function(id) {
            console.log('connected successfully! you are player ' + id);
            //this.playerId = id;
            myPlayerId = id;
        });

        socket.on('newPlayerConnected', function(username) {
            console.log('Player ' + username + ' has entered the room!');
        });

        socket.on('userDisconnected', function(username) {
            console.log('Player ' + username + ' has left the room!');
        });
        var self = this;
        
        socket.on('allPlayersConnected', self.nextState);
        
        socket.on('goToWaitRoom', function() {
                self.state.start('Sync');
        });

        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

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
            //pt_game.avatar.destroy();

    		//	Then let's go back to the main menu.
            pt_game.state.start('MainMenu');
        }

	},

    nextState: function (players) {
        //var pt_game = this;
        console.log('outside nextSate');
        console.log(players);
        console.log('username: ' + players[0]['username'] + ', head: '+ players[0].headSpriteId);
        pt_game.state.start('Game', true, false, players);
    },

    shutdown: function ()
    {
        this.world.forEach(function (item){
            item.destroy();
        });
    }

};