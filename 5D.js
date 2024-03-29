// Dependency inversion principle
// Principiul de Înlocuire a Dependințelor (Dependency Inversion Principle - DIP):

// Modulele de nivel superior nu ar trebui să depindă de modulele de nivel inferior,
// ci ar trebui să depindă de abstracțiuni.
// Acest principiu sugerează că o clasă nu ar trebui să se bazeze direct
// pe o altă clasă, ci ar trebui să se bazeze pe o interfață sau o clasă abstractă.

class Fetch {
    request(url) {
        // return fetch(url).then(r => r.json())
        return Promise.resolve('data from fetch')
    }
}

class LocalStorage {
    get() {
        const dataFromLocalStorage = 'data from local storage'
        return dataFromLocalStorage
    }
}

class FetchClient {
    constructor() {
        this.fetch = new Fetch()
    }

    clientGet() {
        return this.fetch.request('vk.com')
    }
}

class LocalStorageClient {
    constructor() {
        this.localStorage = new LocalStorage()
    }

    clientGet(key) {
        return this.localStorage.get(key)
    }
}


class Database {
    constructor(client) {
        this.client = client
    }

    getData(key) {
        return this.client.clientGet(key)
    }
}


const db = new Database(new LocalStorageClient())

console.log(db.getData('rand'))