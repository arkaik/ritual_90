BasicGame.Floppy = function (game) {


    this.rollUp = 1;
    this.rewindLimit = 10000;
    this.rewindCount = 1;

    this.totalFoodSteps = 14;
    this.stepsDistance = this.totalFoodSteps/this.foodLimit;
    this.stepCount = 0;

    this.percentage = 0;

    this.windX = 0;
    this.windY = 0;

    this.sweetPointX = 413;
    this.sweetPointY = 461;

    this.sweetMarginV = 10;
    this.sweetMarginH = 30;

    this.victory = false;


    this.vhss = ['VHS1','VHS2','VHS3','VHS4'];


    this.texturNow = 0
};

BasicGame.Floppy.prototype = {

	create: function () {
        //this.avatar = new Player(this, this.game.width/2, this.game.height/2);
        //this.add.existing(this.avatar);

        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.scale.setTo(0.26,0.26);

        var quit_btn = this.add.button(0,0, "quitButton", this.quitGame());
        quit_btn.scale.setTo(0.25, 0.25);

        this.torreSprite = this.add.sprite(0, 0, 'torre');
        this.torreSprite.x = 60
        this.torreSprite.y = 130
        this.torreSprite.scale.setTo(0.22,0.22);

        this.floppySprite = this.add.sprite(0, 0, 'floppy');
        this.floppySprite.x = 60
        this.floppySprite.y = 130
        this.floppySprite.scale.setTo(0.22,0.22);

        this.physics.arcade.enable(this.floppySprite);

            this.floppySprite.body.collideWorldBounds = true;


        this.makeWindX();
        this.makeWindY();

        this.time.events.repeat(Phaser.Timer.SECOND * 1, 150, this.makeWindY, this);
        this.time.events.repeat(Phaser.Timer.SECOND * 1, 150, this.makeWindX, this);


        //this.labelP = this.add.text(350,680, "Rewinded "+this.percentage+" of 100", { font: '24px Lemiesz', fill: '#000' });

        cursors = this.input.keyboard.createCursorKeys();

        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpButton.onDown.add(this.pressed,this);
        this.jumpButton.onUp.add(this.released,this);

        this.timeSpent = new Date().getTime();
        var self = this;
        //socket.on('minigameFinished', function(players, winner) {
          //  self.backToWaitRoom(players, winner);
        //});

        this.infotext = this.add.text(this.world.centerX, 100, "Move with arrow keys!\n  Insert with spacebar!", {font: "28px Lemiesz", fill: "#000"} )
        this.infotext.anchor.setTo(0.5,0.5);
        
        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        /*
        var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
 
if (document.attachEvent) //if IE (and Opera depending on user setting)
    document.attachEvent("on"+mousewheelevt, this.displaywheel());
else if (document.addEventListener) //WC3 browsers
    document.addEventListener(mousewheelevt, this.displaywheel(), false);
        */
	}, 

    pt_game: this,

    makeWindX: function () {
        var k = this.rnd.integer();
        var neg = Math.pow(-1, k);

        this.windX = neg * this.rnd.between(100,190);
        console.log(this.windX);

    },

    makeWindY: function () {
        var k = this.rnd.integer();
        var neg = Math.pow(-1, k);

        this.windY = neg * this.rnd.between(100,190);
        console.log(this.windY);

    },

    addRewind: function () {
        this.rewindCount ++;
    },

    update: function () {


        if (this.floppySprite.x >= this.sweetPointX - this.sweetMarginH){
            if (this.floppySprite.x <= this.sweetPointX + this.sweetMarginH){
                if (this.floppySprite.y >= this.sweetPointY - this.sweetMarginV) {
                    if (this.floppySprite.y <= this.sweetPointY + this.sweetMarginV) {
                        this.victory = true;
                    }
                    else {
                        this.victory = false;
                    }
                }
                else {
                    this.victory = false;
                }
            }
            else {
                this.victory = false;
            }
        }
        else {
            this.victory = false;
        }

        //console.log(this.floppySprite.x)

        /*

        if (this.rewindCount >= this.rewindLimit) {
            //posa aqui el codi de quan has avabat
            this.labelP.setText("Rewinded "+100+" of 100");
            console.log('wiiiiiii')
        }
        else {
            this.percentage = this.rewindCount/100;
            this.labelP.setText("Rewinded "+Math.floor(this.percentage)+" of 100");
        }
        */

        this.floppySprite.body.velocity.x = this.windX;
        this.floppySprite.body.velocity.y = this.windY;

        if (cursors.left.isDown)
        {
            this.floppySprite.body.velocity.x += -250;
        }
        else if (cursors.right.isDown)
        {
            this.floppySprite.body.velocity.x += 250;
        }
        if (cursors.up.isDown)
        {
            this.floppySprite.body.velocity.y += -250;
        }
        else if (cursors.down.isDown)
        {
            this.floppySprite.body.velocity.y += 250;
        }

        //console.log(this.floppySprite.y+" "+this.floppySprite.x)
    },


    rotate: function () {
        if (this.texturNow == 3) {
            console.log('pene');
            this.texturNow = 0;
            this.vhs.loadTexture(this.vhss[this.texturNow]);

        }
        else {
            this.texturNow ++;
            this.vhs.loadTexture(this.vhss[this.texturNow]);
            console.log(this.texturNow);
        }
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
        if (this.victory == true) {
            // console.log('you win!!!')
            socket.emit('FloppyFinished');
        }
        else {
            console.log('wroooong')
        }
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