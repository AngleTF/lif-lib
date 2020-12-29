class Url {
    constructor (url, options) {
        this.url = '';
        this.protocol = '';
        this.prot = '';
        this.path = '';
        this.host = '';
        this.query = '';
        this.params = Object.create(null);
        this.sourceUrl = url;
        this.httpRule = /^((?:(https?):\/\/)?([^:^/]+)?(?::(\d+))?\/?([^?]+))\??(.*)/;
        this.paramRule = /([\w[\]]+)=(\w*)&?/g;
        this.parse();
    }

    parse () {
        if (!this.httpRule.test(this.sourceUrl)) {
            throw new Error('Wrong HTTP address');
        }

        const urlInfo = Array.from(this.sourceUrl.match(this.httpRule));
        this.url = urlInfo[1];
        this.protocol = urlInfo[2];
        this.host = urlInfo[3];
        this.prot = urlInfo[4] ? urlInfo[4] : null;
        this.path = urlInfo[5];
        this.query = urlInfo[6] ? urlInfo[6] : null;

        if (this.query) {
            const arrParams = Array.from(this.query.matchAll(this.paramRule));
            arrParams.forEach((math) => {
                this.params[math[1]] = math[2];
            });
        }
    }

    combine () {
        return this.url + '?' + this.getQuery();
    }

    set (key, val) {
        this.params[key] = encodeURIComponent(val);
    }

    remove (key) {
        if (key in this.params) {
            delete this.params[key];
        }
    }

    get (key) {
        return key in this.params ? decodeURIComponent(this.params[key]) : null;
    }

    getQuery () {
        const kv = [];
        for (const key in this.params) {
            kv.push(key + '=' + this.params[key]);
        }
        return kv.join('&');
    }
}

export default Url;
