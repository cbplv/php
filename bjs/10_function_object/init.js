
window.onload = function()
{
    const initPerson = personGenerator.getPerson();
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('surnameOutput').innerText = initPerson.surname;
    document.getElementById('genderOutput').innerText = initPerson.gender+',';
    document.getElementById('birthYearOutput').innerText = initPerson.yearOfBirth+' года рождения';
    document.getElementById('jobTitle').innerText = initPerson.job;
    document.getElementById('cardbody').style.backgroundColor = initPerson.color;

};