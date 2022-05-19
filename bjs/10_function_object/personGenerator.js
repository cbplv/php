const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    patronymicJson: `{
        "count": 3,
        "list": {     
            "id_1": "Валерьев",
            "id_2": "Дмитриев",
            "id_3": "Владимиров"
        }
    }`,    
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Ольга",
            "id_2": "Марианна",
            "id_3": "Анна",
            "id_4": "Екатерина",
            "id_5": "Галина",
            "id_6": "Анастасия",
            "id_7": "Валентина",
            "id_8": "Любовь",
            "id_9": "Наталья",
            "id_10": "Даце"
        }
    }`,
    jobMale: `{
        "count": 4,
        "list": {     
            "id_1": "трубоукладчик",
            "id_2": "боцман",
            "id_3": "обвальщик",
            "id_4": "шаxтёр"
        }
 
    }`,
    jobFemale: `{
        "count": 3,
        "list": {     
            "id_1": "специалист по уxоду",
            "id_2": "педагог",
            "id_3": "стюардесса"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomFirstName: function(gender = '') {

        if (gender == 'Мужчина') {
            return this.randomValue(this.firstNameMaleJson);
        }else{
            return this.randomValue(this.firstNameFemaleJson);            
        }

    },


    randomSurname: function(gender ='') {

        if (gender == 'Мужчина') {
            return this.randomValue(this.surnameJson);
        }else{
            return this.randomValue(this.surnameJson)+'а';
        }

    },

    randomPatronymic: function(gender ='') {

        if (gender == 'Мужчина') {
            return this.randomValue(this.patronymicJson)+'ич';
        }else{
            return this.randomValue(this.patronymicJson)+'на';
        }

    },


    randomGender: function() {

        if (this.randomIntNumber(1,0)===1){
            return this.GENDER_MALE;
        } else {
            return this.GENDER_FEMALE;
        }

    },

    isLeapYear: function(yr){ //проверка на високосный год, для генерации 29.02

        return !((yr % 4) || (!(yr % 100) && (yr % 400)));

    },

    randomJobTitle: function(gender){

        if (gender == 'Мужчина') {
            return this.randomValue(this.jobMale);
        }else{
            return this.randomValue(this.jobFemale);
        }        

    },

    getPerson: function () {
        this.person = {};
        year = this.randomIntNumber(2014, 1953);
        date = '';
        switch (this.randomIntNumber(12, 1)) {
            case 1:
                date = this.randomIntNumber(31, 1)+' января';
                break;
            case 2:
                if(this.isLeapYear(year)){
                    date = this.randomIntNumber(29,28)+' февраля';
                }else{
                    date = this.randomIntNumber(28, 1)+' февраля';
                }
                break;
            case 3:
                date = this.randomIntNumber(31, 1)+' марта';
                break;
            case 4:
                date = this.randomIntNumber(30, 1)+' апреля';
                break;
            case 5:
                date = this.randomIntNumber(31, 1)+' мая';
                break;
            case 6:
                date = this.randomIntNumber(30, 1)+' июня';
                break;
            case 7:
                date = this.randomIntNumber(31, 1)+' июля';
                break;
            case 8:
                date = this.randomIntNumber(31, 1)+' августа';
                break;
            case 9:
                date = this.randomIntNumber(30, 1)+' сентября';
                break;
            case 10:
                date = this.randomIntNumber(31, 1)+' октября';
                break;
            case 11:
                date = this.randomIntNumber(30, 1)+' ноября';
                break;
            case 12:
                date = this.randomIntNumber(31, 1)+' декабря';
                break;
        }

        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender)+' '+this.randomPatronymic(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        this.person.yearOfBirth = date+' '+year;
        this.person.job = '( '+this.randomJobTitle(this.person.gender)+' )';

        return this.person;
    }
};

document.querySelector('#btn_generator').addEventListener('click', () => {
    window.onload();
})

document.querySelector('#btn_clear').addEventListener('click', () => {

    document.getElementById('firstNameOutput').innerText = ' ';
    document.getElementById('surnameOutput').innerText = ' ';
    document.getElementById('genderOutput').innerText = ' ';
    document.getElementById('birthYearOutput').innerText = ' ';
    document.getElementById('jobTitle').innerText = ' ';
})