// https://stackoverflow.com/a/32911774 answering https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
