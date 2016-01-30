BasicGame.Tamagotchi = function (game) {
    this.foodCount = 0;
    this.foodLimit = 20;
    this.texturaActual = 'tamaA2';
    this.tamagotchiSprite;

};

BasicGame.Tamagotchi.prototype = {

    


	create: function () {

        //this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        //this.add.existing(this.avatar);

        var quit_text = this.add.text(0,100, "Quit", { font: '24px Arial', fill: '#fff' });
        quit_text.inputEnabled = true;
        quit_text.events.onInputUp.add(this.quitGame());

        this.tamagotchiSprite = this.add.sprite(0, 0, 'tamaA2');

        
        


        this.tamagotchiSprite.scale.setTo(0.25,0.25);


        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpButton.onDown.add(this.pressed,this);


        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		//this.avatar.cap.rotation += 0.1;



        if (this.foodCount >= this.foodLimit ) {
            this.grow();
        }
/*
        if (this.jumpButton.OnUp) {
            this.foodCount ++;
            console.log(this.foodCount);
        }
*/
	},

    grow: function() {
        if (this.texturaActual == 'tamaA2') {
            this.texturaActual = 'tamaA1';
            this.tamagotchiSprite.loadTexture('tamaA1');
            this.foodCount = 0;
        }
        else if (this.texturaActual == 'tamaA1') {
            this.texturaActual = 'tamaB2';
            this.tamagotchiSprite.loadTexture('tamaB2');
            this.foodCount = 0;
        }
        else if (this.texturaActual == 'tamaB2') {
            this.texturaActual = 'tamaB1';
            this.tamagotchiSprite.loadTexture('tamaB1');
            this.foodCount = 0;
        }
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

	},

    pressed: function(key)
    {
        this.foodCount ++;
        console.log(this.foodCount);
    }

};