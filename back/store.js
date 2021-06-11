const Store = require('electron-store');
const store = new Store();
const timespan = require('timespan');

exports.GetOptions = function() {
    return {
        'sleep-time': store.get('settings.sleep.time', new timespan.TimeSpan(0, 0, 0, 20)),
        'sleep-span': store.get('settings.sleep.span', new timespan.TimeSpan(0, 0, 0, 8)),
        'musics': store.get('settings.musics', [])
    };
};

exports.SetOptions = function(content, value) {
    switch (content) {
        case 'sleep-time':
            store.set({settings: {sleep: {time: toString(value)}}});
            break;
        case 'sleep-span':
            store.set({settings: {sleep: {span: toString(value)}}});
            break;
        case 'musics':
            store.set({settings: {musics: value}});
            break;
    }
}
