// index.js
// Load scripts in this exact order in index.html:
//
// 1) angular.min.js
// 2) metawidget-core.min.js
// 3) metawidget-angular.min.js
// 4) app.js   (your Angular controller + config)
// 5) index.js (this file)
//
// ------------------------------------------------------------------
(function () {
    'use strict';

    if (typeof angular === 'undefined' || !window.metawidget) {
        console.error('[boot] Missing AngularJS or Metawidget.');
        return;
    }

    try {
        angular.module('app')
            .run(function () {
                console.log('[boot] AngularJS + Metawidget ready ✅');
            });
    } catch (e) {
        // fallback if app.js didn’t define a module yet
        angular.module('app', ['metawidget'])
            .run(function () {
                console.log('[boot] Fallback app started ✅');
            });
    }
})();

