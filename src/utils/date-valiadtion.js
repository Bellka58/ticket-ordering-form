export const dateMask = (prevValue, value) => {
    let changedValue = value;
    const arr = value.split('');
    const arrWithoutDots = value.split('');
    if (arrWithoutDots.length >= 3) {
        arrWithoutDots[2] = '';
    }
    if (arrWithoutDots.length >= 6) {
        arrWithoutDots[5] = '';
    }
    const valueWithoutDots = arrWithoutDots.join('');

    if (!(valueWithoutDots.match(/^[0-9]*$/) || value === "")) {
        changedValue = prevValue;
    }
    if (value.length >= 11) {
        return changedValue.slice(0, 10);
    }

    if (value.length === 2 && prevValue.length < 2) {
        arr.push('.');
        changedValue = arr.join('');
    }
    if (value.length === 5 && prevValue.length < 5) {
        arr.push('.')
        changedValue = arr.join('')
    }
    return changedValue;
};

export const dateMaskInput = (e, value) => {
    if (e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
    }

    var len = value.length;

    // If we're at a particular place, let the user type the slash
    // i.e., 12/12/1212
    if (len !== 1 || len !== 3) {
        if (e.keyCode === 47) {
            e.preventDefault();
        }
    }

    // If they don't add the slash, do it for them...
    if (len === 2) {
        value += '/';
    }

    // If they don't add the slash, do it for them...
    if (len === 5) {
        value += '/';
    }
};