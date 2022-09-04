
const url = require("url");
const qs = require("querystring");

const {Cookie, Store, CookieJar} = require("tough-cookie");

const fetch = require("node-fetch");

class Net {
    constructor(host) {
        this.base = url.parse(host);
        this.jar = new CookieJar();
    }
    setCookie(str) {
        return new Promise((y) => {
            this.jar.store.putCookie(str, y);
        });
    }

    getCookies() {
        return new Promise((y) => {
            return this.jar.store.getAllCookies((err, data) => y(data[0]));
        });
    }
    async get(page, query, savecookie) {
        if (!query) query = {};
        let obj = Object.assign(this.base, {
            pathname: page,
            query,
        });
        let res = await fetch(url.format(obj), {
            headers: {
                Cookie: await this.getCookies(),
                "User-Agent": Net.UserAgent,
            },
        });
        if (savecookie && res.headers.has("set-cookie"))
            await this.setCookie(res.headers.get("set-cookie"));

        return res.text();
    }
    async getJSON(page, query) {
        return JSON.parse(await this.get(page, query));
    }
    async rawGet(page, savecookie) {
        let res = await fetch(this.base.href + page, {
            headers: {
                Cookie: await this.getCookies(),
                "User-Agent": Net.UserAgent,
            },
        });
        if (savecookie)
            if (res.headers.has("set-cookie"))
                await this.setCookie(res.headers.get("set-cookie"));

        return res.text();
    }
    async getBin(page, savecookie) {
        let res = await fetch(this.base.href + page, {
            headers: {
                Cookie: await this.getCookies(),
                "User-Agent": Net.UserAgent,
            },
        });
        if (savecookie)
            if (res.headers.has("set-cookie"))
                await this.setCookie(res.headers.get("set-cookie"));

        return res.buffer();
    }
    async post(page, query, savecookie) {
        if (!query) query = {};

        let params = new URLSearchParams();
        for (let i in query) params.append(i, query[i]);

        let res = await fetch(this.base.href + page, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: await this.getCookies(),
                "User-Agent": Net.UserAgent,
            },
            redirect: "manual",
            body: params,
        });
        //console.log(await res.text(),res.headers);
        if (savecookie)
            if (res.headers.has("set-cookie"))
                await this.setCookie(res.headers.get("set-cookie"));
        return res.text();
    }
}
Net.parseCookies = function (cookies) {
    let arr = cookies.split("; ");
    let obj = {};
    for (let i in arr) {
        let item = arr[i].split("=");
        obj[item[0]] = item[1];
    }
    return obj;
};
Net.UserAgent = "Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36";
Net.login = "/website/login";
Net.submit = `/content/student/temp/zzdk?_t_s_=${new Date().getTime()}`;
Net.list = `content/tabledata/student/temp/zzdk?bSortable_0=false&bSortable_1=true&iSortingCols=1&iDisplayStart=0&iDisplayLength=12&iSortCol_0=1&sSortDir_0=desc`
Net.lastone = `/content/student/temp/zzdk/lastone`
Net.edit = `/wap/menu/student/temp/zzdk/_child_/edit`
Net.wechat = `https://sctapi.ftqq.com/`

module.exports = Net;
