
const formContainer = document.querySelector(".php-email-form");

formContainer.innerHTML = "";

function addInput(labelText, type, name, colClass = "col-12") 
{
    const wrapper = document.createElement("div");
    wrapper.className = colClass;

    const label = document.createElement("label");
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.className = "form-control";
    input.required = true;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    formContainer.appendChild(wrapper);
}


addInput("Vardas", "text", "vardas", "col-md-6");
addInput("Pavardė", "text", "pavarde", "col-md-6");
addInput("El. paštas", "email", "email");
addInput("Telefono numeris", "tel", "telefonas");
addInput("Adresas", "text", "adresas");

const title = document.createElement("h4");
title.textContent = "Vertinimo klausimai (1–10)";
formContainer.appendChild(title);

function addSlider(questionText, name) {
    const wrapper = document.createElement("div");
    wrapper.className = "col-12";

    const label = document.createElement("label");
    label.textContent = questionText;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "1";
    slider.max = "10";
    slider.name = name;
    slider.className = "form-range";

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
    formContainer.appendChild(wrapper);
}

addSlider("1. Kaip vertinate mūsų paslaugas?", "klausimas1");
addSlider("2. Kaip tikėtina, kad rekomenduotumėte mus kitiems?", "klausimas2");
addSlider("3. Kaip vertinate bendrą patirtį?", "klausimas3");

const submitWrapper = document.createElement("div");
submitWrapper.className = "col-12 text-center";

const button = document.createElement("button");
button.type = "submit";
button.className = "btn";
button.textContent = "Submit";

submitWrapper.appendChild(button);
formContainer.appendChild(submitWrapper);


const form = document.querySelector(".php-email-form");


const output = document.createElement("div");
output.style.marginTop = "20px";
form.appendChild(output);

function popup()
{
  const wrapper1 = document.createElement("div");
  wrapper1.className = "popup-1";

  const text = document.createElement("h1");
  text.textContent = "Duomenys pateikti sėkmingai";

  wrapper1.appendChild(text);
  form.appendChild(wrapper1);
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const klausimas1 = Number(form.querySelector("input[name='klausimas1']").value);
    const klausimas2 = Number(form.querySelector("input[name='klausimas2']").value);
    const klausimas3 = Number(form.querySelector("input[name='klausimas3']").value);


    const formData = {
        vardas: form.querySelector("input[name='vardas']").value,
        pavarde: form.querySelector("input[name='pavarde']").value,
        email: form.querySelector("input[name='email']").value,
        telefonas: form.querySelector("input[name='telefonas']").value,
        adresas: form.querySelector("input[name='adresas']").value,
        klausimas1,
        klausimas2,
        klausimas3,
        vidurkis: ((klausimas1+klausimas2+klausimas3)/3).toFixed(1)
    };


    console.log("Formos duomenys:", formData);


    output.innerHTML = `
        <h4>Įvesti duomenys:</h4>
        <p><strong>Vardas:</strong> ${formData.vardas}</p>
        <p><strong>Pavardė:</strong> ${formData.pavarde}</p>
        <p><strong>El. paštas:</strong> ${formData.email}</p>
        <p><strong>Telefonas:</strong> ${formData.telefonas}</p>
        <p><strong>Adresas:</strong> ${formData.adresas}</p>
        <p><strong>Vertinimas 1:</strong> ${formData.klausimas1}</p>
        <p><strong>Vertinimas 2:</strong> ${formData.klausimas2}</p>
        <p><strong>Vertinimas 3:</strong> ${formData.klausimas3}</p>
        <p><strong> ${formData.vardas} ${formData.pavarde}:<strong> ${formData.vidurkis}</p>
    `;

    popup();
});



const onlyLetters = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const nameInput = form.querySelector("input[name='vardas']");
const surnameInput = form.querySelector("input[name='pavarde']");
const emailInput = form.querySelector("input[name='email']");
const addressInput = form.querySelector("input[name='adresas']");
const phoneInput = form.querySelector("input[name='telefonas']");
const submitBtn = form.querySelector("button[type='submit']");


submitBtn.disabled = true;
submitBtn.style.opacity = "0.5";


function setError(input, message) {
    input.classList.add("error");

    let msg = input.nextElementSibling;
    if (!msg || !msg.classList.contains("error-message")) {
        msg = document.createElement("div");
        msg.classList.add("error-message");
        input.insertAdjacentElement("afterend", msg);
    }
    msg.textContent = message;
}

function clearError(input) {
    input.classList.remove("error");

    let msg = input.nextElementSibling;
    if (msg && msg.classList.contains("error-message")) {
        msg.remove();
    }
}

nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() === "") {
        setError(nameInput, "Vardas negali būti tuščias");
    } else if (!onlyLetters.test(nameInput.value)) {
        setError(nameInput, "Vardas gali būti tik iš raidžių");
    } else {
        clearError(nameInput);
    }
    validateForm();
});


surnameInput.addEventListener("input", () => {
    if (surnameInput.value.trim() === "") {
        setError(surnameInput, "Pavardė negali būti tuščia");
    } else if (!onlyLetters.test(surnameInput.value)) {
        setError(surnameInput, "Pavardė gali būti tik iš raidžių");
    } else {
        clearError(surnameInput);
    }
    validateForm();
});


emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() === "") {
        setError(emailInput, "El. paštas negali būti tuščias");
    } else if (!emailRegex.test(emailInput.value)) {
        setError(emailInput, "Neteisingas el. pašto formatas");
    } else {
        clearError(emailInput);
    }
    validateForm();
});

addressInput.addEventListener("input", () => {
    if (addressInput.value.trim() === "") {
        setError(addressInput, "Adresas negali būti tuščias");
    } else {
        clearError(addressInput);
    }
    validateForm();
});


phoneInput.addEventListener("input", () => {
    // Keep only digits
    let digits = phoneInput.value.replace(/\D/g, "");

    // Format into +370 6xx xxxxx
    if (!digits.startsWith("370")) {
        digits = "370" + digits.replace(/^370/, "");
    }

    digits = digits.substring(0, 11); // max 11 digits after 370

    let formatted = "+370 ";

    if (digits.length > 3) formatted += digits[3];
    if (digits.length > 4) formatted += digits[4];
    if (digits.length > 5) formatted += digits[5];

    if (digits.length > 6) formatted += " " + digits.substring(6);

    phoneInput.value = formatted;

    validateForm();
});

function validateForm() {
    const errors = form.querySelectorAll(".error");

    const emptyFields = [
        nameInput.value.trim(),
        surnameInput.value.trim(),
        emailInput.value.trim(),
        addressInput.value.trim(),
        phoneInput.value.trim()
    ].some(v => v === "");

    if (errors.length === 0 && !emptyFields && phoneInput.value.length >= 14) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
    }
}