//Name Validation
function validateName() {
    if(!(regexName.test(Name.value))){
        document.getElementById('nameErr').innerHTML = 'Please enter valid Name (only contain letters)';
        Name.style.border = '1px solid red';
        return false;
    }
    else{
        document.getElementById('nameErr').innerHTML = '';
        Name.style.border = '1px solid green';
        return true;
    }
}

//Email Validation
function validateEmail() {
    if(!(regexEmail.test(email.value))){
        document.getElementById('emailErr').innerHTML = 'Please enter valid Email';
        email.style.border = '1px solid red';
        return false;
    }
    else{
        document.getElementById('emailErr').innerHTML = '';
        email.style.border = '1px solid green';
        return true;
    }
}

//Number Validation
function validateNumber() {
    if(!(regexNumber.test(num.value))){
        document.getElementById('numErr').innerHTML = 'Please enter valid contact number';
        num.style.border = '1px solid red';
        return false;
    }
    else{
        document.getElementById('numErr').innerHTML = '';
        num.style.border = '1px solid green';
        return true;
    }
}

//Birthdate Validation
function validateDob() {
    let date = new Date(dob.value)
    if(!(date.getFullYear()>=1950 && date.getFullYear()<=2010)){
        document.getElementById('dobErr').innerHTML = 'Please enter date.Date must be between 1950 - 2010';
        dob.style.border = '1px solid red';
        return false;
    }
    else{
        document.getElementById('dobErr').innerHTML = '';
        dob.style.border = '1px solid green';
        return true;
    }
}

//Calculating age
function AgeCalc(){
    var birthDate = dob;
    var chosenDate = new Date(birthDate.value);
    var currentDate = new Date();

    var age = currentDate.getFullYear() - chosenDate.getFullYear();

    return age;
}

//Password Validation
function validatePassword() {
    if(!(regexPswd.test(pswd.value))){
        document.getElementById('pswdErr').innerHTML = 'Password must contain 8-15 chars.1 Uppercase, digit, specialChar';
        pswd.style.border = '1px solid red';
        return false;
    }
    else {
        document.getElementById('pswdErr').innerHTML = '';
        pswd.style.border = '1px solid green';
        return true;
    }
}

function togglePassword(){
    if(pswd.type === 'password'){
        pswd.type = 'text';
    }else{
        pswd.type = 'password';
    }
}


//Pan Validation
function validatePan() {
    if(!(regexPan.test(pan.value))){
        document.getElementById('panErr').innerHTML = 'Please enter valid Pan number';
        pan.style.border = '1px solid red';
        return false;
    }
    else{
        document.getElementById('panErr').innerHTML = '';
        pan.style.border = '1px solid green';
        return true;
    }
}

//Gender validation
function validateGender() {
    if(gender.value === ''){
        document.getElementById('genderErr').innerHTML = 'Please select your gender';
        gender.style.border = '1px solid red';
        return false;
    }
    else{
        document.getElementById('genderErr').innerHTML = '';
        gender.style.border = '1px solid green';
        return true;
    }
}

//Education validation
function validateEducation() {
    if(edu.value == ''){
        document.getElementById('eduErr').innerHTML = 'Please select your education qualification';
        edu.style.border = '1px solid red';
        return false;
    }else{
        document.getElementById('eduErr').innerHTML = '';
        edu.style.border = '1px solid green';
        return true;
    }
}

var proImage = '';
var Itype = '';
var Isize = '';


//ImageFile validation
function restrictImage() {
    let validImage = false;
    let imgInput = document.getElementById('img');
    let imgFile = document.getElementById('img').files;

    if(imgFile.length === 0){
        InvalidFile('Please upload your profile')
    }else if(imgFile[0].size > 2 * 1024 * 1024) {
        InvalidFile('Image size must be less than 2MB');
    }else{
        const Exten = ['image/png', 'image/jpeg'];
        if(Exten.includes(imgFile[0].type)) {
            validImage = true;
            document.getElementById('imgErr').innerHTML = '';
            imgInput.style.border = '1px solid green'

            var read = new FileReader();
            read.onload = function (e) { //after reading is successful, the file is stored in proImage
                proImage = e.target.result;
            };
            read.readAsDataURL(imgFile[0]); //URL representing the file's data as a base64 encoded string
        }else{
            InvalidFile('Only PNG or JPEG')
        }
    }

    function InvalidFile(err) {
        document.getElementById('imgErr').innerHTML = err;
        img.style.border = '1px solid red'
    }

    return validImage;
}

//Username Validation
function validateUsername() {
    let ussr = false;
    if(username === ''){
        document.getElementById('usernameErr').innerHTML = 'Please provide a username';
        username.style.border = '1px solid red';
        return false;
    }else{
        if(!(uniqueUsername(username))){
            document.getElementById('usernameErr').innerHTML = 'Username already exists'
            username.style.border = '1px solid red';
            return false;
        }else {
            document.getElementById('usernameErr').innerHTML = ''
            username.style.border = '1px solid green';
            return true;
        }
    }
}

//Check uniqueUsername
function uniqueUsername(username) {
    var user = JSON.parse(localStorage.getItem('Data')) || [];
    return !user.some(usr => usr.username === username.value); //check atleast one of the elements in array matches the current data
}

//Searching
function search() {
    var searchInput = document.getElementById('searching').value.toLowerCase();

    if(searchInput == ''){
        document.getElementById('srch').innerHTML = "Enter anything to search";
        document.getElementById('searchErr').innerHTML = '';
        backForm();
        return;
    }
    else{
        var ageRegex = searchInput.match(/^(\d+)$/);
        var sizeRegex = searchInput.match(/^(\d+)([mbkbMBKB]{1,2})$/);
        var nameRegex = searchInput.match(/^[a-zA-Z\s]+$/);
        if(ageRegex){
            var inData = JSON.parse(localStorage.getItem('Data')) || [];
            var resultSearch = inData.filter(data => data.age < (searchInput/365));
            displayResult(resultSearch);
        }else if(sizeRegex){
            var numb = parseFloat(sizeRegex[1]);
            var by = sizeRegex[2].toLowerCase();
            var searchBytes = (by === 'kb' ? numb * 1024 : numb * 1024 * 1024);

            var inData = JSON.parse(localStorage.getItem('Data')) || [];
            var resultSearch = inData.filter(data => data.imgProp.Isize < searchBytes);
            displayResult(resultSearch);
        }else if(nameRegex) {
            var inData = JSON.parse(localStorage.getItem('Data')) || [];
            var resultSearch = inData.filter(data => data.name.toLowerCase().startsWith(searchInput.toLowerCase()));
            displayResult(resultSearch);
        }
    }
}

//Displaying results
function displayResult(result) {
    var searchResultDisp = document.getElementById('searchResultDisplay');
    var formContainer = document.getElementById('formContainer');
    var sub = document.getElementById('sub');
    let back = 1;
    searchResultDisp.textContent = '';

    for(let i = 0;i <= result.length; i++){
        if(result[i]){
            searchResultDisp.style.display = 'flex';
            formContainer.style.display = 'none';
            sub.style.display = 'none';
            var resultDetail = document.createElement('div');
            resultDetail.innerHTML = "<p>User Profile details:</p>";
            resultDetail.innerHTML += `<img src="${result[i].image}" width="100" height="100">`;
            resultDetail.innerHTML += `<p><b>Name:</b>${result[i].name}</p>`;
            resultDetail.innerHTML += `<p><b>Email:</b>${result[i].email}</p>`;
            resultDetail.innerHTML += `<p><b>Contact:</b>${result[i].contact}</p>`;
            resultDetail.innerHTML += `<p><b>DOB:</b>${result[i].dob}</p>`;
            resultDetail.innerHTML += `<p><b>Gender:</b>${result[i].gender}</p>`;
            resultDetail.innerHTML += `<p><b>Education:</b>${result[i].education}</p>`;
            resultDetail.innerHTML += `<p><b>Occupation:</b>${result[i].occupation}</p>`;
            resultDetail.innerHTML += `<p><b>Username:</b>${result[i].username}</p>`;
            resultDetail.innerHTML += `<p><b>PAN:</b>${result[i].pan}</p>`;
            searchResultDisp.appendChild(resultDetail);
            back = 0;
            document.getElementById('searchErr').innerHTML = '';
        }
    }
    if(back == 0){
        resultDetail.innerHTML += `<button id="back" onclick="backForm()" style="color: black">Back</button>`;
        document.getElementById('srch').innerHTML = "results related to your search";
        document.getElementsById('searchErr').innerHTML = '';
    }else{
        searchResultDisp.style.display = 'none';
        document.getElementById('searchErr').innerHTML = 'No matching records found';
    }
}

//return to form
function backForm() {
    var bForm = document.getElementById('formContainer');
    var container = document.getElementById('searchResultDisplay');
    var bsub = document.getElementById('sub');
    var srr = document.getElementById('searching').value = '';
    document.getElementById('searchErr').innerHTML = '';
    container.style.display = 'none';
    bForm.style.display = 'block';
    sub.style.display = 'block';
}


// checkAllValidations
function validateForm(e){
    // e.preventDefault();
    // console.log(validateDob() && validateEmail() && validatePassword() && validateName() && validateUsername() && validateNumber() && validatePan() && restrictImage());
    if(validateDob() && validateEmail() && validatePassword() && validateName() && validateUsername() && validateNumber() && validatePan() && restrictImage()){
        Entry();
    }
}

// StoringInLocalStorage
function Entry() {
    Itype = document.getElementById('img').files[0].type;
    Isize = document.getElementById('img').files[0].size;
        var datum = {
            name: Name.value,
            email: email.value,
            contact: num.value,
            dob: dob.value,
            age: AgeCalc(),
            gender: gender.value,
            education: edu.value,
            occupation: occupation.value,
            username: username.value,
            password: pswd.value,
            pan: pan.value,
            image: proImage,
            imgProp: {Itype, Isize}
        }
        var sub = JSON.parse(localStorage.getItem('Data')) || [];
        sub.push(datum);
        localStorage.setItem('Data', JSON.stringify(sub));

        alert('Form submitted');
}


const form = document.getElementById('form')
const Name = document.getElementById('name')
const email = document.getElementById('email')
const num = document.getElementById('contact')
const dob = document.getElementById('dob')
const gender = document.getElementById('gender')
const edu = document.getElementById('education')
const occupation = document.getElementById('occupation')
const username = document.getElementById('username')
const pswd = document.getElementById('password')
const pan = document.getElementById('pan')
const img = document.getElementById('img')

// RegularExpressions
const regexName = /^\w+/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexNumber = /^[6-9]\d{9}$/;
const regexPswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const regexPan = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

// Events
Name.addEventListener('input',validateName);
email.addEventListener('input', validateEmail);
num.addEventListener('input', validateNumber);
dob.addEventListener('input', validateDob);
gender.addEventListener('input', validateGender);
edu.addEventListener('input', validateEducation);
pswd.addEventListener('input', validatePassword);
pan.addEventListener('input', validatePan);
img.addEventListener('change', restrictImage);
username.addEventListener('input', validateUsername);


function validateUsername2(){
    if(username.value === ''){
        document.getElementById('usernameErr').innerHTML = 'Enter an username';
        username.style.border = '1px solid red';
    }
    else{
        validateUsername();
    }
}


//focus
Name.addEventListener('focusout', validateName);
email.addEventListener('focusout',validateEmail);
num.addEventListener('focusout',validateNumber);
dob.addEventListener('focusout', validateDob);
gender.addEventListener('focusout', validateGender);
edu.addEventListener('focusout', validateEducation);
pswd.addEventListener('focusout', validatePassword);
pan.addEventListener('focusout', validatePan);
img.addEventListener('focusout', restrictImage);
username.addEventListener('focusout', validateUsername2);

form.addEventListener('submit', (e) => validateForm(e));