BasicGame.Pizza = function (game) {
    this.separation = 130;
    this.pizzasY = 360;
    this.pizzasScaleTo = 0.20;

    this.pizzas = ["pizza1","pizza2","pizza3","pizza4"];

    this.alreadyChosenOne = false;

    this.chosen = 1



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

        var quit_text = this.add.text(0,100, "Quit", { font: '24px Arial', fill: '#fff' });
        quit_text.inputEnabled = true;
        quit_text.events.onInputUp.add(this.quitGame());

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


        var labelPizza1 = this.add.text(200+this.separation*0, this.pizzasY-60, "1", { font: '46px Arial', fill: '#fff' });

        var labelPizza2 = this.add.text(200+this.separation*1, this.pizzasY-60, "2", { font: '46px Arial', fill: '#fff' });

        var labelPizza3 = this.add.text(200+this.separation*2, this.pizzasY-60, "3", { font: '46px Arial', fill: '#fff' });

        var labelPizza4 = this.add.text(200+this.separation*3, this.pizzasY-60, "4", { font: '46px Arial', fill: '#fff' });

        var labelPizza5 = this.add.text(200+this.separation*4, this.pizzasY-60, "5", { font: '46px Arial', fill: '#fff' });

        var labelPizza6 = this.add.text(200+this.separation*5, this.pizzasY-60, "6", { font: '46px Arial', fill: '#fff' });

        key1 = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(this.pressed1, this);

        key2 = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(this.pressed2, this);

        key3 = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(this.pressed3, this);

        key4 = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key4.onDown.add(this.pressed4, this);

        key5 = this.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key5.onDown.add(this.pressed5, this);

        key6 = this.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key6.onDown.add(this.pressed6, this);


        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

    winner: function () {
      console.log("wiiiii")
    },

    looser: function () {
      console.log("booooo")
    },

    pressed1: function () {
        if (this.chosen == 1) {
            this.winner();
        }
        else {
            this.looser();
        }
    },

    pressed2: function () {
        if (this.chosen == 2) {
            this.winner();
        }
        else {
            this.looser();
        }
    },

    pressed3: function () {
        if (this.chosen == 3) {
            this.winner();
        }
        else {
            this.looser();
        }
    },

    pressed4: function () {
        if (this.chosen == 4) {
            this.winner();
        }
        else {
            this.looser();
        }
    },

    pressed5: function () {
        if (this.chosen == 5) {
            this.winner();
        }
        else {
            this.looser();
        }
    },

    pressed6: function () {
        if (this.chosen == 6) {
            this.winner();
        }
        else {
            this.looser();
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