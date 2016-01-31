BasicGame.Vhs = function (game) {


    this.rollUp = 1;
    this.rewindLimit = 10000;
    this.rewindCount = 1;

    this.totalFoodSteps = 14;
    this.stepsDistance = this.totalFoodSteps/this.foodLimit;
    this.stepCount = 0;

    this.percentage = 0;


    this.vhss = ['VHS1','VHS2','VHS3','VHS4'];


        this.texturNow = 0
};

BasicGame.Vhs.prototype = {

	create: function () {
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
        this.vhs = this.add.sprite(0, 0, this.vhss[this.texturNow]);
        this.vhs.x = 50
        this.vhs.y = 130
        this.vhs.scale.setTo(0.25,0.25);


        this.labelP = this.add.text(350,680, "Rewinded "+this.percentage+" of 100", { font: '24px Lemiesz', fill: '#000' });


        this.timeSpent = new Date().getTime();
        var self = this;
        //socket.on('minigameFinished', function(players, winner) {
          //  self.backToWaitRoom(players, winner);
        //});

        this.infotext = this.add.text(this.world.centerX, 100, "Scroll your mouse WHEEL\nto rewind the cassette!", {font: "28px Lemiesz", fill: "#000"} )
        this.infotext.anchor.setTo(0.5,0.5);
        
        //this.add.sprite(this.game.width/3, this.game.height/2, "base1");
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
 
    if (document.attachEvent) //if IE (and Opera depending on user setting)
    document.attachEvent("on"+mousewheelevt, this.displaywheel());
    else if (document.addEventListener) //WC3 browsers
    document.addEventListener(mousewheelevt, this.displaywheel(), false);

	}, 

    pt_game: this,

    displaywheel: function () {
        var pt_game = this;
        return function (e) {
            var evt=window.event || e; //equalize event object
            var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta
            console.log("displaywheel");
            if (delta > 0) {
                pt_game.rewindCount+=delta;
                pt_game.rollUp+=delta;
                console.log(""+delta+", "+pt_game.rewindCount);
                /*if (delta >= 100 ) {
                    pt_game.rewindCount ++;
                    console.log(pt_game.rewindCount); 
                }
                else if (delta >= 200)
                    pt_game.rewindCount +=2;*/
                if (pt_game.rollUp > 300) {
                    pt_game.rotate();
                    pt_game.rollUp =- 300;
                }
            }
        };
    },

    addRewind: function () {
        this.rewindCount ++;
    },

    update: function () {
        

        if (this.rewindCount >= this.rewindLimit) {
            //posa aqui el codi de quan has avabat

            this.labelP.setText("Rewinded "+100+" of 100");
            //console.log('wiiiiiii')

        }
        else {
            this.percentage = this.rewindCount/100;
            this.labelP.setText("Rewinded "+Math.floor(this.percentage)+" of 100");
        }
    },


    rotate: function () {
        if (this.texturNow == 3) {
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
        else if (document.removeEventListener) 
            document.removeEventListener (mousewheelevt,this.displaywheel,false);
         
    }

};