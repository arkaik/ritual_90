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

	create: function () {

        this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        this.add.existing(this.avatar);

        var quit_text = this.add.text(0,0, "Quit", { font: '24px Arial', fill: '#fff' });
        quit_text.inputEnabled = true;
        quit_text.events.onInputUp.add(this.quitGame());

        /*var next_text = this.add.text(0, 200, "Next", { font: '24px Arial', fill: '#fff' });
        next_text.inputEnabled = true;
        next_text.events.onInputUp.add(this.quitGame());*/

        socket = io.connect('http://localhost:4242');

        socket.on('connect', function () {
            console.log('user connected!');
            var username = prompt("Enter your username:") || "anon";
            socket.emit('userConnected', username);
        });

        socket.on('connectionACK', function(id) {
            console.log('connected successfully! you are player ' + id);
        });

        socket.on('newPlayerConnected', function(username) {
            console.log('Player ' + username + ' has entered the room!');
        });

        socket.on('userDisconnected', function(username) {
            console.log('Player ' + username + ' has left the room!');
        });
        var self = this;
        socket.on('allPlayersConnected', self.nextState());

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

    nextState: function () {
        var pt_game = this;
        console.log('outside nextSate');
        return function()
        {
            //  Then let's go back to the main menu.
            console.log('inside nextSate');
            pt_game.state.start('Game');
        }
    },

    shutdown: function ()
    {
        //Borrar los objetos aquí
        //this.avatar.destroy();
    }

};