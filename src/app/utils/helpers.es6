let helpers = {
      colorizeOrClear: (indentifier, color, toggle, clear=false) => {
        let element = document.getElementById(indentifier);
        element.style.backgroundColor = color;
        element.style.weight = 'bold';
        element.style.color = color === 'white' ? '#070713' : 'white';
        if(clear) element.value = '';
    }
}

export default helpers;