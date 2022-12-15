const StorageService = {
    get: function (key) {
        return JSON.parse(localStorage.getItem(key))
    },
    set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    },
    remove: function (key) {
        localStorage.removeItem(key)
    },
    clear: function () {
        localStorage.clear()
    }
}
export default StorageService;