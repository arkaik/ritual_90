BasicGame.Pizza = function (game) {
    this.separation = 130;
    this.pizzasY = 360;
    this.pizzasScaleTo = 0.20;

    this.winnerPizza = "pizza1";

};

BasicGame.Pizza.prototype = {

    pt_game: this,

    create: function () {
        this.pizzas = ["pizza1","pizza2","pizza3","pizza4"];
        this.pizzas.push(this.pizzas[this.rnd.between(1, this.pizzas.length-1)]);
        this.pizzas.push(this.pizzas[this.rnd.between(1, this.pizzas.length-2)]);
        console.log(this.pizzas);
        shuffle(this.pizzas);
        this.generalBackgroundSprite = this.add.sprite(0, 0, 'generalBackground');
        this.generalBackgroundSprite.scale.setTo(0.26,0.26);

        var quit_btn = this.add.button(0,0, "quitButton", this.quitGame());
        quit_btn.scale.setTo(0.25, 0.25);

        this.boxSprite = this.add.sprite(0, 0, 'box');
        //this.boxSprite.x = 200;
        //this.boxSprite.y = this.pizzasY;
        this.boxSprite.scale.setTo(0.26,0.26);

        for (var i = 0; i < this.pizzas.length; ++i) {
            var pizzaSprite = this.add.sprite(0, 0, this.pizzas[i]);
            pizzaSprite.x = 100 + i*this.separation;
            pizzaSprite.y = this.pizzasY;
            pizzaSprite.scale.setTo(this.pizzasScaleTo,this.pizzasScaleTo);
        }
        this.infotext = this.add.text(this.world.centerX, 100, "Choose the best pizza slice!", {font: "28px Lemiesz", fill: "#000"} )
        this.infotext.anchor.setTo(0.5,0.5);

        var keys = [];
        for (var i = 0; i < 10; ++i) {
            keys[i] = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        }

        for (i = 0; i < 6; i++) {
            var labelPizza = this.add.text(200+this.separation*i, this.pizzasY-60, ""+(i+1)+"", { font: '46px Lemiesz', fill: '#fff' });    
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

        var self = this;
        if (socket != null) socket.on('minigameFinished', function(players, winner) {
            self.backToWaitRoom(players, winner);
        });
    },

    winner: function () {
      if (socket != null) socket.emit('pizzaFinished');
    },

    looser: function () {
      //console.log("booooo");
    },

    pressedi: function (i)
    {
        return function()
        {
            if (this.pizzas[i-1] == this.winnerPizza) {
                this.add.text(200+this.separation*(i-1), this.pizzasY-100, "Yay!", {font:"28px Lemiesz", fill:"#006400"});
                
            console.log("wiiiii "+i);

                this.winner();
            }
            else {
                this.add.text(200+this.separation*(i-1), this.pizzasY-100, "Nope", {font:"28px Lemiesz", fill:"#640000"});
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
            //  Here you should destroy anything you no longer need.
            //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

            //  Then let's go back to the main menu.
            pt_game.state.start('MainMenu');
        }

    },

    backToWaitRoom: function (players, winner) {
        pt_game.state.start('Game', true, false, players, winner);
    }
};