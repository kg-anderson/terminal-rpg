const term = require('terminal-kit').terminal
const rls = require('readline-sync');

class baseCharacter {
    constructor(name, health, attackDamage, speed) {
        this.name = name;
        this.health = health;
        this.attackDamage = attackDamage;
        this.speed = speed
    }
    attack(target) {
        term.red('*********************************\n')
        console.log(`${this.name}'s chance to attack!\n`)
        term.white(`${this.name} hits the ${target.name} for ${this.attackDamage} damage`)
        target.health = target.health - this.attackDamage
        term.red('\n *********************************')

    }
}


class playerCharacter extends baseCharacter {
    constructor(name, health, attackDamage, speed, specialAttack) {
        super(name, health, attackDamage, speed)
        this.specialAttack = specialAttack;
    }
    specialMove(target) {
        term.green('*********************************\n ')
        console.log(`${this.name}'s chance to attack!`)
        console.log(`\n${this.name} hits the ${target.name} for ${this.specialAttack} special damage \n`)
        target.health = target.health - this.specialAttack
        term.green('*********************************\n ')
    }
    attack(target) {
        term.yellow(`\n \n Your Go! Current Health: ${this.health}`)
        let actions = ['Attack', "Special Attack"]
        let index = rls.keyInSelect(actions, "Select your action")
        battle.checkMoves(index + 1, target)
    }
    normalAttack(target) {
        term.green('*********************************\n ')
        console.log(`${this.name}'s chance to attack!`)
        console.log(`\n${this.name} hits the ${target.name} for ${this.attackDamage} damage \n`)
        target.health = target.health - this.attackDamage
        term.green('*********************************\n ')
    }
}


class Encounter {
    start() {
        term.yellow('******************** \n \n')
        term.green('The battle begins \n \n')
        term.yellow('********************')

        let playerSpeed = player.speed
        let monsterSpeed = monster.speed
        let firstAttacker;
        let target;

        if (playerSpeed >= monsterSpeed) {
            firstAttacker = player
            target = monster
            this.doFirstAction(firstAttacker, target)
        } else {
            firstAttacker = monster
            target = player
            this.doFirstAction(firstAttacker, target)
        }
    }
    doFirstAction(firstAttacker, target) {

        console.log(`\n \n The ${firstAttacker.name} goes first against the ${target.name} \n \n`)

        firstAttacker.attack(target)
        this.isEndOfBattle(firstAttacker, target)
        target.attack(firstAttacker)
        this.getBattleStatus(firstAttacker, target)

    }
    getBattleStatus(firstAttacker, target) {
        if (firstAttacker.health > 0 && target.health > 0) {
            firstAttacker.attack(target)
            this.isEndOfBattle(firstAttacker, target)
            target.attack(firstAttacker)
            this.getBattleStatus(firstAttacker, target)
        }
        if (player.health <= 0) {
            this.isEndOfBattle(firstAttacker, target)

        }
        if (target.health <= 0) {
            this.isEndOfBattle(firstAttacker, target)
        }

    }
    checkMoves(move, target) {
        switch (move) {
            case 1: player.normalAttack(target)
                break
            case 2: player.specialMove(target)
                break
            case 0: process.exit()
        }
    }
    isEndOfBattle(firstAttacker, target) {
        if (target.health <= 0) {
            console.log(`\n The battle ends!`)
            term.red(`${target.name} loses \n`)
            term.yellow(`${firstAttacker.name} wins! \n`)

            process.exit()
        }
    }
}


let player = new playerCharacter('Player', 200, 20, 600, 50)
let monster = new baseCharacter('Monster', 200, 50, 700)
let battle = new Encounter


battle.start()



