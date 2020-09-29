'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        let r = this.routes;
        ( (scope, r) => {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r) {
        if (window.location.hash.length > 0) {
            for (let i = 0, length = r.length; i<length; i++) {
                let route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                    return
                }
            }
            scope.goToRoute('404.html');
        } else {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        ((scope) => {
            const url = `views/${htmlName}`;
            const xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    },
    getParams: function (url) {
        let params = {};
        const parser = document.createElement('a');
        parser.href = url;
        const query = parser.search.substring(1);
        const vars = query.split('&');
        for (let i=0, len=vars.length; i < len; i++) {
            const pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }
}