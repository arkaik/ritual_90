BasicGame.Pizza = function (game) {
    this.separation = 130;
    this.pizzasY = 300;
    this.chosenOne = "x";
    pizzasScaleTo = 0.20;

};

BasicGame.Pizza.prototype = {

 
	create: function () {

        //this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        //this.add.existing(this.avatar);

        var quit_text = this.add.text(0,100, "Quit", { font: '24px Arial', fill: '#fff' });
        quit_text.inputEnabled = true;
        quit_text.events.onInputUp.add(this.quitGame());

        this.boxSprite = this.add.sprite(0, 0, 'box');
        //this.boxSprite.x = 200;
        //this.boxSprite.y = this.pizzasY;
        this.boxSprite.scale.setTo(0.26,0.26);

        this.pizzaASprite = this.add.sprite(0, 0, 'pizza1');
        this.pizzaASprite.x = 100;
        this.pizzaASprite.y = this.pizzasY;
        this.pizzaASprite.scale.setTo(pizzasScaleTo,pizzasScaleTo);

        this.pizzaBSprite = this.add.sprite(0, 0, 'pizza1');
        this.pizzaBSprite.x = this.pizzaASprite.x + this.separation;
        this.pizzaBSprite.y = this.pizzasY;
        this.pizzaBSprite.scale.setTo(pizzasScaleTo,pizzasScaleTo);

        this.pizzaCSprite = this.add.sprite(0, 0, 'pizza1');
        this.pizzaCSprite.x = this.pizzaBSprite.x + this.separation;
        this.pizzaCSprite.y = this.pizzasY;
        this.pizzaCSprite.scale.setTo(pizzasScaleTo,pizzasScaleTo);

        this.pizzaDSprite = this.add.sprite(0, 0, 'pizza1');
        this.pizzaDSprite.x = this.pizzaASprite.x + this.separation*3;
        this.pizzaDSprite.y = this.pizzasY;
        this.pizzaDSprite.scale.setTo(pizzasScaleTo,pizzasScaleTo);

        this.pizzaESprite = this.add.sprite(0, 0, 'pizza1');
        this.pizzaESprite.x = this.pizzaASprite.x + this.separation*4;
        this.pizzaESprite.y = this.pizzasY;
        this.pizzaESprite.scale.setTo(pizzasScaleTo,pizzasScaleTo);

        this.pizzaFSprite = this.add.sprite(0, 0, 'pizza1');
        this.pizzaFSprite.x = this.pizzaASprite.x + this.separation*5;
        this.pizzaFSprite.y = this.pizzasY;
        this.pizzaFSprite.scale.setTo(pizzasScaleTo,pizzasScaleTo);
        
        this.tamagotchiSprite.scale.setTo(0.25,0.25);

        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpButton.onDown.add(this.pressed,this);


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