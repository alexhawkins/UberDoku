let helpers = {
    colorizeOrClear: (indentifier, color, clear, toggle) => {
        let toggle = toggle;
        let element = document.getElementById(indentifier);
        element.style.backgroundColor = color;
        element.style.weight = 'bold';
        element.style.color = color === 'white' ? '#070713' : 'white';
        if (clear) element.value = '';
    }
}

export default helpers;
