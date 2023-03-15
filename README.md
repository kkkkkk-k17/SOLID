# Tema: Principiile SOLID
### Autor: Curcubet Ecaterina
### Grupa: TI-204
Principiile SOLID sunt un set de cinci principii de proiectare software, dezvoltate pentru a ajuta programatorii să creeze cod robust, extensibil și ușor de întreținut.

#### Principiile SOLID sunt următoarele:

- Principiul de Responsabilitate Unică (Single Responsibility Principle - SRP): O clasă trebuie să aibă o singură responsabilitate. Aceasta înseamnă că o clasă ar trebui să fie responsabilă doar pentru o singură parte a funcționalității aplicației și că nu ar trebui să aibă prea multe responsabilități.

- Principiul Deschis/Închis (Open/Closed Principle - OCP): Clasele trebuie să fie deschise pentru extensibilitate, dar închise pentru modificare. Acest principiu sugerează că ar trebui să putem extinde comportamentul unei clase fără a schimba codul existent.

- Principiul de Substituire Liskov (Liskov Substitution Principle - LSP): Obiectele de tipul unei clase de bază ar trebui să poată fi înlocuite cu obiecte de tipul unei clase derivate, fără a afecta corectitudinea programului.

- Principiul de Înlocuire a Dependințelor (Dependency Inversion Principle - DIP): Modulele de nivel superior nu ar trebui să depindă de modulele de nivel inferior, ci ar trebui să depindă de abstracțiuni. Acest principiu sugerează că o clasă nu ar trebui să se bazeze direct pe o altă clasă, ci ar trebui să se bazeze pe o interfață sau o clasă abstractă.

- Principiul de Separare a Interfețelor (Interface Segregation Principle - ISP): Clasele nu ar trebui să fie forțate să implementeze metode pe care nu le folosesc. Acest principiu sugerează că ar trebui să creăm interfețe mici și specializate, astfel încât o clasă să poată implementa doar interfețele de care are nevoie.

Împreună, aceste cinci principii SOLID sunt concepute să ajute programatorii să creeze cod modular, ușor de întreținut și flexibil pentru modificări ulterioare.

### 1. Single Responsability Principle

Am creat o clasa news , un constructor al clasei news si i-am atribuit elementele title si text, care formeaza obiectul dat. Si atunci cand de exemplu creez o noutate noua,  
by default *this.modified=false*, el ne spune despre aceea daca a fost schimbata noutatea.

    class News {
    constructor(title, text) {
        this.title = title
        this.text = text
        this.modified = false
    }

Deci,am creat o clasa aparte *class NewsPrinter* care va raspunde de transmiterea noutatii catre un
format anumit. In constructorul clasei newprinter noi vom primi o noutate pe care o vom
introduce intr-o variabila instanta.

    class NewsPrinter {
    constructor(news) {
        this.news = news
    }

Am creat functiile html,json,xml care apoi vor fi returnate in console.log. Deci clasa News are responsabilitatea de logica, initializare, iar clasa NewsPrinter are responsabilitatea de afisare a datelor(noutatii) intr-un format anumit.


----

### 2. Open-Closed Principle


Am creat o clasa de baza, clasa parinte Shape care are o metoda Area.


    class Shape {
    area() {
        throw new Error('Area method should be implemented')
    } }

Clasele circle, square, rectangle mostenesc de la clasa Shape, din aceasta cauza ca noi mostenim si este realizat constructorul avem nevoie de *super()*, ca sa fie apelat constructorul parinte.

    class Square extends Shape {
    constructor(size) {
        super()
        this.size = size
    }

Am implementat functia Area, care trebuie sa fie realizata pentru toate clasele care mostenesc de la clasa Shape, pentru ca logica de calculare a ariei pentru toate figurile este diferita.

Pentru Square:

    area() {
        return this.size ** 2
    }
In clasa AreaCalculator, am creat functia *sum()*, unde se calculeaza aria totala a figurilor, pentru aceasta am facut apel la *this.shapes* si la metoda 'reduce', si asa cum in aceasta functie se lucreaza cu interfetele, la acc se adauga shape.area().

    class AreaCalculator {
    constructor(shapes = []) {
        this.shapes = shapes
    }
    sum() {
        return this.shapes.reduce((acc, shape) => {
            acc += shape.area()
            return acc
        }, 0)
Astfel, nu am schimbat clasa *AreaCalculator()*, nu adaug nici un tip de figura, dar pur si simplu scriu un element nou. Prin urmare clasa data este deschisa pentru extindere, si totodata este inschisa pentru modificari, adica functia sum() este deja efectuata si la ea noi nu ne mai intoarcem.

    const calc = new AreaCalculator([

    new Square(10),
    new Circle(1),
    ...

---
### 3. Liskov’s Substitution Principle

Am creat un nivel de abstractizare sub forma de o clasa de baza *class Member extends Person*, care este mostenita de la Person, si care are access().

    class Member extends Person {
      access() {
      console.log('Tu ai acces')
    } }

Am creat o alta clasa Guest, care deja nu are access(), astfel adaugand un nou nivel de abstractizare.

    class Guest extends Person {
     isGuest = true
    }

Deci, clasa Frontend  o mostenim de la **Member**, la fel ca si clasa Backend, astfel Frontend si Backend devin angajati.

    class Frontend extends Member {
    canCreateFrontend() {}
    }
    class Backend extends Member {
    canCreateBackend() {}
    }

Iar persoana din alta companie *PersonFromDiferentCompany* este mostenita de la **Guest**, in acelasi timp ei nu sunt lipsiti de calitatile umane, toti sunt oameni, dar sunt diferite tipuri de oameni.

    class PersonFromDifferentCompany extends Guest {
    access() {
    throw new Error('Tu nu ai acces')
    } }

Astfel functia openSecretDoor lucreaza cu **Member**. In cazul dat am ales corect nivelurile de abstractizari si Liskov’s Substitution Principle a fost respectat.

    function openSecretDoor(member) {
    member.access()
    }

---
### 4. Interface Segregation Principle

Putem respecta acest princiupiu cu ajutorul composition api. Am creat clasa Animal de la care celelalte clase vor mosteni.

    class Animal {
    constructor(name) {
        this.name = name
    } }

Dupa am creat obiectul care va adauga proprietatea de inot (swimmer) cu metoda *swim()*. Acelasi lucru am creat pentru proprietatile de mers si zbor (walker, flier).

    const swimmer = {
    swim() {
        console.log(`${this.name} can swim `)
    } }

Am creat clasa Dog care este mostenita de la clasa Animal, la fel am creat clasele Eagle si Whale.

    class Dog extends Animal {}
    class Eagle extends Animal {}
    class Whale extends Animal {}

Utilizand metoda Object.assign(), care face merge la cateva obiecte, m-am referit la clasa Dog, la propotipul sau si am facut merge cu obiectele **swimmer** si **walker**. Acelasi lucru am facut pentru Eagle (flier,walker) si Whale (swimmer).

    Object.assign(Dog.prototype, swimmer, walker)
    Object.assign(Eagle.prototype, flier, walker)
    Object.assign(Whale.prototype, swimmer)

Deci, am atribuit la fiecare clasa, care sunt mostenite de la clasa Animal, metodele corespunzatoare fara proprietati suplimentare, astfel respectand Interface Segregation Principle.

---

### 5. Dependency Inversion Principle.

Am creat o clasa *class Database* ,ce contine o metoda **saveData(data)** ,care primeste un argument **data** si afiseaza un mesaj in consola ca datele au fost salvate,aceasta fiind o dependenta de nivel inferior.

    class Database {
    saveData(data) {
    console.log("Data saved to database: ", data);
    } }

Am creat clasa App care depinde de clasa Database,cu constructorul care primeste un argument database si stocheaza referinta la acesta in *this.database*, la randul sau *saveData(data)* apeleaza metoda saveData a obiectului database stocat in **this.database**. Aceasta este o dependenta de nivel superior.

    class App {
    constructor(database) {
    this.database = database;
    }
    saveData(data) {
    this.database.saveData(data);
    } }
Dupa, am creat o instanta a clasei Database si am stocat-o in variabila database. Am creat o instanta a clasei App, care primeste ca argument instanta 'database' creata anterior.
Am apelat la metoda saveData a obiectului app, care apeleaza metoda 'saveData' a obiectului **database**, afișând mesajul "Data saved to database: Hello, world" in consola.

    const database = new Database();
    const app = new App(database);
    app.saveData("Hello, world");

In exemplul dat, clasa App depinde de clasa Database pentru a salva datele. Am respectat principiul Dependency Inversion prin faptul ca clasa App depinde de o abstractie a clasei Database, reprezentata de metoda saveData. Deci daca ar trebui sa schimbam implementarea bazei de date, ar trebui doar sa ne asiguram ca implementarea noua respecta aceeasi interfata, adică are o metodă 'saveData'.
  