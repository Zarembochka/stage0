const buycardBtn = document.querySelector('.btn-submit-buycard');

const buycardForm = document.querySelector('.buycard__form');

buycardForm.addEventListener('focusout', checkValidationBuycard);
buycardForm.addEventListener('focusin', focusValidation);
buycardForm.addEventListener('input', formatBuycard);

function checkValidationBuycard(event) {
    const element = event.target;
    checkValidationBuyCardElement(element);
};

function checkValidationBuycardForm(form, inputs) {
    const formInputs = form.querySelectorAll(inputs);
    let validForm = true;
    for (let i = 0; i < formInputs.length; i++) {
        if (!checkValidationBuyCardElement(formInputs[i])) {
            validForm = false;
        }
    }
    return validForm;
}

function checkValidationBuyCardElement(element) {
    if (element.type === 'submit') {
        return true;
    }

    if (element.name === 'bankcard_number') {
        return checkBankcardNumber(element);
    }

    if (element.name === 'bankcard_code1' || element.name === 'bankcard_code2') {
        return checkBankcardCode(element);
    }

    if (element.name === 'bankcard_cvc') {
        return checkBankcardCvc(element);
    }

    return checkBankcardTextElement(element);

};

function checkBankcardNumber(input) {
    const value = input.value.trim();
    const pattern = /^[0-9\s]{19}$/;
    if (pattern.test(value) == false) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'incorrect cardnumber';
        return false;
    }
    input.classList.add('register__form__input-valid');
    return true;
}

function checkBankcardCode(input) {
    const value = input.value.trim();
    const pattern = /^[0-9]{2}$/;
    if (pattern.test(value) == false) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'incorrect expiration code';
        return false;
    }
    input.classList.add('register__form__input-valid');
    return true;
}

function checkBankcardCvc(input) {
    const value = input.value.trim();
    const pattern = /^[0-9]{3}$/;
    if (pattern.test(value) == false) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'incorrect cvc';
        return false;
    }
    input.classList.add('register__form__input-valid');
    return true;
}

function checkBankcardTextElement(input) {
    const value = input.value.trim();
    if (value.length === 0) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'field is required';
        return false;
    }
    input.classList.add('register__form__input-valid');
    return true;
}

function formatCardNumber(element) {
    element.value = element.value
    .replace(/([0-9]{4})(?!\s|$)/gm, `$1 `).match(/(?:[0-9]{4} ?){0,3}(?:[0-9]{0,4})?/);
}

function formatBankcardCode(element) {
    element.value = element.value.replace(/\D/g, '');
}

function formatBankcardCvc(element) {
    element.value = element.value.replace(/\D/g, '');
}

function formatBuycardElement(element) {
    if (element.name === 'bankcard_number') {
        return formatCardNumber(element);
    }

    if (element.name === 'bankcard_code1' || element.name === 'bankcard_code2') {
        return formatBankcardCode(element);
    }

    if (element.name === 'bankcard_cvc') {
        return formatBankcardCvc(element);
    }
};

function formatBuycard(event) {
    const element = event.target;
    formatBuycardElement(element);
};

buycardBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (checkValidationBuycardForm(buycardForm, '.register__form__input')) {
        event._isClickOnTheButtonSubmit = true;
        addLibraryCardToUser(currentUser);
        clearForm(buycardForm, '.register__form__input', 'register__form__input');
        hideModal(buycardForm);
    }
});
