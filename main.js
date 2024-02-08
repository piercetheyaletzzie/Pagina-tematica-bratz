if ('serviceWorker' in navigator) {
    console.log("Puedes usar el service worker");
    navigator.serviceWorker.register('sw.js')
        .then(res => console.log("service worker registraaooo", res))
        .catch(err => console.log("Service worker sin ser regiostraaooo", err));
}
else {
    console.log("No se puede usar el service worker");
}