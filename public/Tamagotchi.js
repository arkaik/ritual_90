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

    pt_game: this,
	create: function () {
        var tam_array = ['tamagotchi1', 'tamagotchi2', 'tamagotchi3'];
        var marco = this.rnd.between(0, tam_array.length-1);
        //this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        //this.add.existing(this.avatar);

        this.texturaActual = 'tamaA2';

        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.scale.setTo(0.26,0.26);

        var quit_btn = this.add.button(0,0, "quitButton", this.quitGame());
        quit_btn.scale.setTo(0.25,0.25);

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

        this.infotext = this.add.text(this.world.centerX, 100, "Press SPACE to feed!", {font: "28px Lemiesz", fill: "#000"} )
        this.infotext.anchor.setTo(0.5,0.5);

        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpButton.onDown.add(this.pressed,this);
        this.jumpButton.onUp.add(this.released,this);

        this.timeSpent = new Date().getTime();
        var self = this;

        this.evoSound = this.add.audio('tamavolution');
        this.feedSound = this.add.audio('tamafeed');
        this.feedSound.volume -= 0.5;

        this.tamamusic = this.add.audio('tamamusic');
        this.tamamusic.loop = true;
        this.tamamusic.play();


        socket.on('minigameFinished', function(players, winner) {
            self.backToWaitRoom(players, winner);
        });
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
        this.feedSound.play();
        this.tamagotchiFoodSprite.y += this.tamagotchiFoodSprite.width;
        this.stepCount -= 1;

    },

    grow: function() {
        this.evoSound.play();
        console.log("Grow");
        if (this.texturaActual === 'tamaA2') {
            this.texturaActual = 'tamaB2';
            this.tamagotchiSprite.loadTexture('tama_anim2', 'tama1');
        }
        else if (this.texturaActual === 'tamaB2') {
            this.texturaActual = 'tamaC2';
            this.tamagotchiSprite.loadTexture('tama_anim3', 'tama1');
            this.tamagotchiSprite.position.y += 10;
        }
        else if (this.texturaActual === 'tamaC2') {
            //this.texturaActual = "tamaA2";
            //this.tamagotchiSprite.loadTexture('tama_anim1', 'tama1');
            if (socket != null) socket.emit('tamagotchiFinished', this.timeSpent);
        }
        this.foodCount = 0;
    },

	quitGame: function () {
        var pt_game = this;
        return function()
        {
    		//	Here you should destroy anything you no longer need.
    		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
            //pt_game.texturaActual = 'tamaA2';
            //pt_game.tamagotchiSprite.loadTexture('tama_anim2', 'tama1');
    		//	Then let's go back to the main menu.
            pt_game.state.start('MainMenu');
        }

	},

    backToWaitRoom: function (players, winner) {
        pt_game.state.start('Game', true, false, players, winner);
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
    },
    shutdown: function()
    {
        this.world.forEach(function (item){
            item.destroy();
        });

        this.tamamusic.stop();

    }

};