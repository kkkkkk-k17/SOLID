
// Principiul de Responsabilitate Unică (Single Responsibility Principle - SRP):
// O clasă trebuie să aibă o singură responsabilitate.
// Aceasta înseamnă că o clasă ar trebui să fie responsabilă
// doar pentru o singură parte a funcționalității aplicației și că nu ar trebui să aibă prea multe responsabilități.
class News {
    constructor(title, text) {
        this.title = title
        this.text = text
        this.modified = false
    }

    update(text) {
        this.text = text
        this.modified = true
    }
}

class NewsPrinter {
    constructor(news) {
        this.news = news
    }

    html() {
        return `
      <div class="news">
        <h1>${this.news.title}</h1>
        <p>${this.news.text}</p>
      </div>
    `
    }

    json() {
        return JSON.stringify({
            title: this.news.title,
            text: this.news.text,
            modified: this.news.modified
        }, null, 2)
    }

    xml() {
        return `
      <news>
        <title>${this.news.title}</title>
        <text>${this.news.text}</text>
      </news>
    `
    }
}


const printer = new NewsPrinter(
    new News('Title', 'Text')
)

console.log(printer.html())
console.log(printer.xml())
console.log(printer.json())