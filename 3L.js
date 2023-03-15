// Liskov substitution principle
// Principiul de Substituire Liskov (Liskov Substitution Principle - LSP):
// Obiectele de tipul unei clase de bază ar trebui să poată fi înlocuite
// cu obiecte de tipul unei clase derivate, fără a afecta corectitudinea programului.

class Person {

}

class Member extends Person {
  access() {
    console.log('Tu ai acces!')
  }
}

class Guest extends Person {
  isGuest = true
}

class Frontend extends Member {
  canCreateFrontend() {}
}

class Backend extends Member {
  canCreateBackend() {}
}

class PersonFromDifferentCompany extends Guest {
  access() {
    throw new Error('Tu nu ai acces!')
  }
}

function openSecretDoor(member) {
  member.access()
}

openSecretDoor(new Frontend())
openSecretDoor(new Backend())
openSecretDoor(new PersonFromDifferentCompany())  // There should be member!