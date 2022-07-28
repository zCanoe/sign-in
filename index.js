const Student = require("./util/student")
const Net = require("./util/net")
const tools = require("./util/tools");
const schedule = require('node-schedule');

const serverJiang = [`SCT130875TSgPUOfcSHwpzmfvVttjsP1dG`,]; //server酱
const user = ["202108210336",];
const pwd = ["hufe@187157",];
const data = {
    'dkdz':	`湖南省长沙市岳麓区咸嘉湖街道学仕路湖南财政经济学院`,
    'dkly':	`lbs`,
    "dkd":	`湖南省长沙市`,
    "jzdValue":	`430000,430100,430104`,
    "jzdSheng.dm" :	"430000",
    'jzdShi.dm': '430100',
    'jzdXian.dm':	'430104',
    'jzdDz':	`学校`,
    'jzdDz2':	`湖南省长沙市`,
    'lxdh':	`   `,
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
    'jkm': "",
    'jkm1': "",
    'xcm': "",
    'xcm1': "",
    'xgym': "",
    'xgym1': "",
    'hsjc': "",
    'hsjc1': '',
    'bz': '',
    'operationType':	`Create`,
    'dm': "",
}

function handle() {
    // QUEUE OF STUDENT
    let tools1 = new tools('', '');
    let student = new Student('', '')
    for (let index in user) {
        student.username = user[index];
        student.pd_mm = pwd[index];
        tools1.username = student.username;
        tools1.pwd = student.pd_mm;
        tools1.login(student).then(()=> {
            tools1.attend(student, serverJiang[index], data).then();
        })
    }
}

handle();



