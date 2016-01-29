// Clase Player
Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'base1'); //Sustituir 'bunny' por imagen jugador

    //this.addChild(game.make.sprite(-50, -50, 'mummy')); Sustituir 'mummy' por hat y otros objetos característicos.

    this.score = 0;

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
/*Player.prototype.update = function() {

    this.angle += this.rotateSpeed;

};*/