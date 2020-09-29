'use strict';

(function () {
    function init() {
        const router = new Router([
            new Route('home', 'home.html', true),
            new Route('about', 'about.html'),
            new Route('user/index', 'user/index.html'),
            new Route('user/edit', 'user/edit.html'),
        ]);
    }
    init();
}());