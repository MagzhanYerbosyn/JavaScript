class Student {
  #city = null;
  planet = 'Earth';
  static country = 'KZ';
  region;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  set city(value) {
    const firstLetter = value[0].toUpperCase();
    const fromSecondLetter = value.slice(1).toLowerCase();
    this.#city = `${firstLetter}${fromSecondLetter}`;
  }

  get city() {
    return this.#city;
  }

  _someSecretAction() {}

  logAge() {
    console.log(this.age);
  }
}

const firstStudent = new Student('Vasya', 25);
const secondStudent = new Student('Petya', 18);

console.log('firstStudent: ', firstStudent);
console.log('secondStudent: ', secondStudent);

firstStudent.logAge();
firstStudent.city = 'almaty';
console.log(firstStudent.city);
