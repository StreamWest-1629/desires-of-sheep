const { app } = require('electron');
const auto = require('auto-launch');

exports.CheckRun = function() {

    const doubleBoot = app.requestSingleInstanceLock();
    if (!doubleBoot) {
        app.quit();
    }

    var stokerRun = new auto({
        name: 'Sheep\'s Stoking',
        path: app.getPath('exe'),
    })

    stokerRun.isEnabled().then(function(isEnabled) {
        if (isEnabled) {
            return;
        } else {
            // stokerRun.enable();
        }
    })
    .catch(function(err) {
        // Todo: エラー時の動作
    })
}
