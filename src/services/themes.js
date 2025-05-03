export const knownThemes = ['light', 'dark'];
const themes = {};

export class Themes {
    constructor() {
        const tasks = knownThemes.map(n => {
            return this.preloadTheme(n).then(s => {
                themes[n] = s;
            })
        });
        Promise.all(tasks).then(t => {
            this._watchSystemChanges();
            const userPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const useTheme = localStorage.getItem("theme") || userPref || knownThemes[0];
            this.select(useTheme);
        });
    }

    preloadTheme(name) {
        return new Promise((resolve, reject) => {
            const id = 'theme-' + name;
            let link = document.createElement('link');
            link.id = id;
            link.rel = "stylesheet";
            link.href = '/themes/' + name + '.css';
            document.head.appendChild(link);
            link.onload = e => {
                const sheet = document.getElementById(id);
                sheet.disabled = true;
                resolve(sheet);
            };
            link.onerror = reject;
        });
    }

    select(name) {
        if (name && !themes[name]) {
            throw new Error(`"${name}" has not been defined as a theme.`);
        }
        let body = document.body;
        Object.keys(themes).forEach(n => themes[n].disabled = (n !== name));
        body.setAttribute("data-theme", name);
        localStorage.setItem("theme", name);
    }

    _watchSystemChanges() {
        if (!window.matchMedia) return;
        window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
            if (e.matches) {
                this.select('dark');
            } else {
                this.select('light');
            }
        });
    }

    get names() {
        return knownThemes;
    }
}