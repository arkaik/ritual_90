BasicGame.Tamagotchi = function (game) {
    this.foodCount = 0;
    this.foodLimit = 20;
    this.texturaActual = 'tamaA2';
    this.tamagotchiSprite;
    this.positionX = 300;
    this.positionY = 200;
    this.foodPositionX = 480;
    this.foodPositionY = 340;

    this.totalFoodSteps = 14;
    this.stepsDistance = this.totalFoodSteps/this.foodLimit;
    this.stepCount = 0;

};

BasicGame.Tamagotchi.prototype = {

	create: function () {
        var tam_array = ['tamagotchi1', 'tamagotchi2', 'tamagotchi3'];
        var marco = this.rnd.between(0, tam_array.length-1);
        //this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        //this.add.existing(this.avatar);

        var quit_text = this.add.text(0,100, "Quit", { font: '24px Arial', fill: '#fff' });
        quit_text.inputEnabled = true;
        quit_text.events.onInputUp.add(this.quitGame());

        this.tamagotchiBaseSprite = this.add.sprite(this.po, 0, 'tamagotchiBase');
        this.tamagotchiBaseSprite.x = this.positionX;
        this.tamagotchiBaseSprite.y = this.positionY;
        this.tamagotchiBaseSprite.scale.setTo(0.25,0.25);

        this.tamagotchiSprite = this.add.sprite(0, 0, 'tama_anim1', 'tama1');    
        this.tamagotchiSprite.x = this.positionX;
        this.tamagotchiSprite.y = this.positionY;
        this.tamagotchiSprite.scale.setTo(0.25,0.25);

        this.tamagotchiFoodSprite = this.add.sprite(0, 0, 'tamaFood');
        this.tamagotchiFoodSprite.x = this.foodPositionX;
        this.tamagotchiFoodSprite.y = this.foodPositionY;
        this.tamagotchiFoodSprite.scale.setTo(0.25,0.25);

        this.tamagotchiScreenSprite = this.add.sprite(0, 0, tam_array[marco]);
        this.tamagotchiScreenSprite.x = this.positionX;
        this.tamagotchiScreenSprite.y = this.positionY;
        this.tamagotchiScreenSprite.scale.setTo(0.25,0.25);

        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpButton.onDown.add(this.pressed,this);
        this.jumpButton.onUp.add(this.released,this);

        this.timeSpent = new Date().getTime();

        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	update: function () {

        if (this.foodCount >= this.foodLimit ) {
            this.grow();
            this.tamagotchiFoodSprite.y = this.foodPositionY;
        }
	},

    moveFood: function () {
        this.tamagotchiFoodSprite.y += this.tamagotchiFoodSprite.width;
        this.stepCount -= 1;
    },

    grow: function() {
        console.log("Grow");
        if (this.texturaActual === 'tamaA2') {
            this.texturaActual = 'tamaB2';
            this.tamagotchiSprite.loadTexture('tama_anim2', 'tama1');
        }
        else if (this.texturaActual === 'tamaB2') {
            this.texturaActual = 'tamaC2';
            this.tamagotchiSprite.loadTexture('tama_anim3', 'tama2');
            this.tamagotchiSprite.position.y += 10;
        }
        else if (this.texturaActual === 'tamaC2') {
            //Emit tama-finish;
        }
        this.foodCount = 0;
    },

	quitGame: function () {
        var pt_game = this;
        return function()
        {
    		//	Here you should destroy anything you no longer need.
    		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
            this.texturaActual = 'tamaA2';
    		//	Then let's go back to the main menu.
            pt_game.state.start('MainMenu');
        }

	},

    pressed: function(key)
    {
        this.tamagotchiSprite.frameName = 'tama2';
        this.foodCount++;
        this.stepCount += this.stepsDistance;
        if (this.stepCount > 1) {
            this.moveFood();
        }
        //console.log(this.foodCount);
    },

    released: function(key)
    {
        this.tamagotchiSprite.frameName = 'tama1';
    }

};