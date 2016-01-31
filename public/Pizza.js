BasicGame.Pizza = function (game) {
    this.separation = 130;
    this.pizzasY = 360;
    this.pizzasScaleTo = 0.20;

    this.pizzas = ["pizza1","pizza2","pizza3","pizza4"];

    this.alreadyChosenOne = false;

    this.chosen = 7;

};

BasicGame.Pizza.prototype = {

 
	create: function () {

        //this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        //this.add.existing(this.avatar);

        this.textureA = this.rnd.between(0, this.pizzas.length-1);

        if (this.textureA == 0) {
            this.alreadyChosenOne = true;
            this.chosen = 1;
        }
        if (this.alreadyChosenOne) {
            this.textureB = this.rnd.between(1, this.pizzas.length-1);
        }
        else {
            this.textureB = this.rnd.between(0, this.pizzas.length-1);
        }

        if (this.textureB == 0) {
            this.alreadyChosenOne = true;
            this.chosen = 2;
        }
        if (this.alreadyChosenOne) {
            this.textureC = this.rnd.between(1, this.pizzas.length-1);
        }
        else {
            this.textureC = this.rnd.between(0, this.pizzas.length-1);
        }

        if (this.textureC == 0) {
            this.alreadyChosenOne = true;
            this.chosen = 3;
        }
        if (this.alreadyChosenOne) {
            this.textureD = this.rnd.between(1, this.pizzas.length-1);
        }
        else {
            this.textureD = this.rnd.between(0, this.pizzas.length-1);
        }

        if (this.textureD == 0) {
            this.alreadyChosenOne = true;
            this.chosen = 4;
        }
        if (this.alreadyChosenOne) {
            this.textureE = this.rnd.between(1, this.pizzas.length-1);
        }
        else {
            this.textureE = this.rnd.between(0, this.pizzas.length-1);
        }

        if (this.textureE == 0) {
            this.alreadyChosenOne = true;
            this.chosen = 5;
        }
        if (this.alreadyChosenOne) {
            this.textureF = this.rnd.between(1, this.pizzas.length-1);
        }
        else {
            this.textureF = 0;
            this.chosen = 6;
        }

        if (this.chosen == 7) {
            this.textureE = 0;
            this.chosen = 5;
        }

        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.scale.setTo(0.26,0.26);

        var quit_btn = this.add.button(0,0, "quitButton", this.quitGame());
        quit_btn.scale.setTo(0.25, 0.25);

        this.boxSprite = this.add.sprite(0, 0, 'box');
        //this.boxSprite.x = 200;
        //this.boxSprite.y = this.pizzasY;
        this.boxSprite.scale.setTo(0.26,0.26);

        this.pizzaASprite = this.add.sprite(0, 0, this.pizzas[this.textureA]);
        this.pizzaASprite.x = 100;
        this.pizzaASprite.y = this.pizzasY;
        this.pizzaASprite.scale.setTo(this.pizzasScaleTo,this.pizzasScaleTo);

        this.pizzaBSprite = this.add.sprite(0, 0, this.pizzas[this.textureB]);
        this.pizzaBSprite.x = this.pizzaASprite.x + this.separation;
        this.pizzaBSprite.y = this.pizzasY;
        this.pizzaBSprite.scale.setTo(this.pizzasScaleTo,this.pizzasScaleTo);

        this.pizzaCSprite = this.add.sprite(0, 0, this.pizzas[this.textureC]);
        this.pizzaCSprite.x = this.pizzaBSprite.x + this.separation;
        this.pizzaCSprite.y = this.pizzasY;
        this.pizzaCSprite.scale.setTo(this.pizzasScaleTo,this.pizzasScaleTo);

        this.pizzaDSprite = this.add.sprite(0, 0, this.pizzas[this.textureD]);
        this.pizzaDSprite.x = this.pizzaASprite.x + this.separation*3;
        this.pizzaDSprite.y = this.pizzasY;
        this.pizzaDSprite.scale.setTo(this.pizzasScaleTo,this.pizzasScaleTo);

        this.pizzaESprite = this.add.sprite(0, 0, this.pizzas[this.textureE]);
        this.pizzaESprite.x = this.pizzaASprite.x + this.separation*4;
        this.pizzaESprite.y = this.pizzasY;
        this.pizzaESprite.scale.setTo(this.pizzasScaleTo,this.pizzasScaleTo);

        this.pizzaFSprite = this.add.sprite(0, 0, this.pizzas[this.textureF]);
        this.pizzaFSprite.x = this.pizzaASprite.x + this.separation*5;
        this.pizzaFSprite.y = this.pizzasY;
        this.pizzaFSprite.scale.setTo(this.pizzasScaleTo,this.pizzasScaleTo);

        for (i = 0; i < 6; i++)
        {
            var labelPizza = this.add.text(200+this.separation*i, this.pizzasY-60, ""+(i+1)+"", { font: '46px Arial', fill: '#fff' });    
        }

        key1 = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(this.pressedi(1), this);

        key2 = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(this.pressedi(2), this);

        key3 = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(this.pressedi(3), this);

        key4 = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key4.onDown.add(this.pressedi(4), this);

        key5 = this.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key5.onDown.add(this.pressedi(5), this);

        key6 = this.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key6.onDown.add(this.pressedi(6), this);


        this.infotext = this.add.text(this.world.centerX, 100, "Choose one with number keys!", {font: "28px Lemiesz", fill: "#000"} )
        this.infotext.anchor.setTo(0.5,0.5);
        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

    winner: function () {
      console.log("wiiiii");
      socket.emit('pizzaFinished');
    },

    looser: function () {
      console.log("booooo");
    },

    pressedi: function (i)
    {
        return function()
        {
            if (this.chosen == i) {
                this.winner();
            }
            else {
                this.looser();
            }    
        }
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