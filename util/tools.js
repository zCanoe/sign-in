process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const Net = require("./net");
const md5 = require("md5")
const Student = require("./student");

class tools{

    constructor(username, pwd) {
        this.username = username;
        this.pwd = pwd;
    }

    async login(student) {
        let net = new Net("https://xsgz.hufe.edu.cn");
        let info = await net.post(
            `${Net.login}`,
            {
                uname: this.username,
                pd_mm: this.getPW(),
            },
            true
        ).then(res => console.log("res",res));
        student.cookie = ((await net.getCookies()).split(";"))[0];
    }

    getPW(){
        let pwd = md5(this.pwd);
        if(pwd.length > 5){
            pwd = pwd.substring(0,5) + "a" + pwd.substring(5,pwd.length);
        }
        if(pwd.length > 10){
            pwd = pwd.substring(0,10) + "b" + pwd.substring(10,pwd.length);
        }
        pwd = pwd.substring(0,pwd.length-2);
        return pwd;
    }

    async attend(student, server, data) {
        await this.login(student).then(()=> {
            console.log("name", student.cookie);
            let net = new Net("https://xsgz.hufe.edu.cn");
            net.setCookie(student.cookie).then(() => {
                    net.post(Net.submit, data, true).then(res => {
                        console.log(res);
                        let sendWechat = {
                            title: "打卡",
                            desp: '',
                        }
                        if (res.result) sendWechat.desp = "打卡成功！";
                        else sendWechat.desp = "打卡失败！";
                        // SEN TO WECHAT
                        let sw = new Net(Net.wechat);
                        sw.post(`${server}.send`, sendWechat, true).then(() => {});
                    })
            }).catch(Error => console.log(Error))
        })
    }
}

module.exports = tools;
