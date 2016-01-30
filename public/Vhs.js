BasicGame.Vhs = function (game) {
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

BasicGame.Vhs.prototype = {

	create: function () {
        var tam_array = ['tamagotchi1', 'tamagotchi2', 'tamagotchi3'];
        var marco = this.rnd.between(0, tam_array.length-1);
        //this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        //this.add.existing(this.avatar);

        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.scale.setTo(0.26,0.26);

        var quit_btn = this.add.button(0,0, "quitButton", this.quitGame());
        quit_btn.scale.setTo(0.25, 0.25);

        /*

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


        */
        this.vhs = this.add.sprite(0, 0, 'VHS1');
        this.vhs.x = 0
        this.vhs.y = 100
        this.vhs.scale.setTo(0.25,0.25);


        key1 = this.input.keyboard.addKey(Phaser.Keyboard.W);
        key1.onDown.add(this.pressed1, this);

        key1 = this.input.keyboard.addKey(Phaser.Keyboard.E);
        key1.onDown.add(this.pressed2, this);

        key1 = this.input.keyboard.addKey(Phaser.Keyboard.D);
        key1.onDown.add(this.pressed3, this);

        key1 = this.input.keyboard.addKey(Phaser.Keyboard.S);
        key1.onDown.add(this.pressed4, this);

        this.timeSpent = new Date().getTime();
        var self = this;
        //socket.on('minigameFinished', function(players, winner) {
          //  self.backToWaitRoom(players, winner);
        //});

        this.infotext = this.add.text(this.world.centerX, 100, "Scroll your mouse WHEEL to rewind!", {font: "28px Lemiesz", fill: "#000"} )
        this.infotext.anchor.setTo(0.5,0.5);
        
        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
 
        if (document.attachEvent) //if IE (and Opera depending on user setting)
            document.attachEvent("on"+mousewheelevt, this.displaywheel);
        else if (document.addEventListener) //WC3 browsers
            document.addEventListener(mousewheelevt, this.displaywheel, false);

	},

    displaywheel: function (e) {
        var evt=window.event || e; //equalize event object
        var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta
        console.log(delta);        
    },

    pressed1: function () {
        this.vhs.loadTexture('VHS1');
    },

    pressed2: function () {
        this.vhs.loadTexture('VHS2');

    },

    pressed3: function () {
        this.vhs.loadTexture('VHS3');
    },

    pressed4: function () {
        this.vhs.loadTexture('VHS4');
    },

    update: function () {

        console.log()
    },

    moveFood: function () {
        this.tamagotchiFoodSprite.y += this.tamagotchiFoodSprite.width;
        this.stepCount -= 1;
    },

    grow: function() {

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

    backToWaitRoom: function (players, winner) {
        pt_game.state.start('Game', true, false, players, winner);
    },

    pressed: function(key)
    {

        //console.log(this.foodCount);
    },

    released: function(key)
    {

    },
    shutdown: function()
    {

        var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

        if (document.detachEvent)
            document.detachEvent ('on'+mousewheelevt,this.displaywheel);
        if (document.removeEventListener) 
            document.removeEventListener (mousewheelevt,this.displaywheel,false);
         
    }

};