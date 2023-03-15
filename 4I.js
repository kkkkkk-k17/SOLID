// Interface segregation principle
// Principiul de Separare a Interfețelor (Interface Segregation Principle - ISP):

// Clasele nu ar trebui să fie forțate să implementeze metode pe care nu le folosesc.
// Acest principiu sugerează că ar trebui să creăm interfețe mici și specializate,
// astfel încât o clasă să poată implementa doar interfețele de care are nevoie.

class Animal {
    constructor(name) {
        this.name = name
    }
}

const swimmer = {
    swim() {
        console.log(`${this.name} can swim `)
    }
}

const flier = {
    fly() {
        console.log(`${this.name} can fly`)
    }
}

const walker = {
    walk() {
        console.log(`${this.name} can walk`)
    }
}

class Dog extends Animal {}
class Eagle extends Animal {}
class Whale extends Animal {}

Object.assign(Dog.prototype, swimmer, walker)
Object.assign(Eagle.prototype, flier, walker)
Object.assign(Whale.prototype, swimmer)

const dog = new Dog('DogName')
dog.walk()
dog.swim()

const eagle = new Eagle('BirdName')
eagle.fly()
eagle.walk()

const whale = new Whale('Bob')
whale.swim()
// class Animal {
//   constructor(name) {
//     this.name = name
//   }
//
//   walk() {
//     console.log(`${this.name} умеет ходить`)
//   }
//
//   swim() {
//     console.log(`${this.name} умеет плавать`)
//   }
//
//   fly() {
//     console.log(`${this.name} умеет летать`)
//   }
// }
//
// class Dog extends Animal {
//   fly() {
//     return null
//   }
// }
//
// class Eagle extends Animal {
//   swim() {
//     return null
//   }
// }
//
// class Whale extends Animal {
//   fly() {
//     return null
//   }
//
//   walk() {
//     return null
//   }
// }
//

