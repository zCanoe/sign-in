const Student = require("./util/student")
const Net = require("./util/net")
const tools = require("./util/tools");
const schedule = require('node-schedule');

let serverJiang = [``,]; //server酱
let user = [``,];
let pwd = [``,];
let phone = [``,];

function handle() {
    for (let index = 0; index < (user).length; index++) {
        let tools1 = new tools('', '');
        let student = new Student('', '');
        let data = {
            'dkdz':	`湖南省长沙市 岳麓区 咸嘉湖街道学仕路湖南财政经济学院`,
            'dkdzZb': '112.944352,28.224494',
            'dkly':	`lbs`,
            'zzdk_token': '',
            "dkd":	`湖南省长沙市`,
            "jzdValue":	`430000,430100,430104`,
            "jzdSheng.dm" :	"430000",
            'jzdShi.dm': '430100',
            'jzdXian.dm':	'430104',
            'jzdDz':	`学校`,
            'jzdDz2':	`湖南省长沙市`,
            'lxdh':	`${phone[index]}`,
            'sfzx':	'1',
            'sfzx1':	`在校`,
            'twM.dm': "01",
            'tw1': `[35.0~37.2]正常`,
            'yczk.dm':	`01`,
            'yczk1':	`无症状`,
            'fbrq': '',
            'jzInd':	'0',
            'jzYy': "",
            'zdjg': "",
            'fxrq': "",
            'brStzk.dm':	"01",
            'brStzk1':	`身体健康、无异常`,
            'brJccry.dm': "01",
            'brJccry1':	`未接触传染源`,
            'jrStzk.dm':	"01",
            'jrStzk1':`身体健康、无异常`,
            'jrJccry.dm':	'01',
            'jrJccry1':	`未接触传染源`,
            'jkm': "1",
            'jkm1': "绿色",
            'xcm': "1",
            'xcm1': "绿色",
            'xgym': "",
            'xgym1': "",
            'hsjc': "",
            'hsjc1': '',
            'bz': '健康打卡',
            'operationType':	`Create`,
            'dm': "",
        }
        student.username = user[index];
        student.pd_mm = pwd[index];
        tools1.username = student.username;
        tools1.pwd = student.pd_mm;
        tools1.attend(student, serverJiang[index], data).then(() => {
        });
    }
}
const  scheduleCronstyle = ()=>{
    //every day 7:random:30
    let random = Math.floor(Math.random() * 60);
    schedule.scheduleJob(`30 ${random} 7 * * *`,()=>{
        handle();
    });
}

scheduleCronstyle();


// exports.handle = (event,context,callback)=>{
//     handle();
//     callback(null,"copy!");
// }


