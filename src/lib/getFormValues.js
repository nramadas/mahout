export default form => {
  if (!form || form.nodeName.toLowerCase() !== 'form') {
    return {};
  }

  return Array.from(form.elements).reduce((values, el) => {
    if (el.name) {
      switch (el.type) {
        case 'checkbox': {
          if (!values[el.name]) { values[el.name] = []; }
          if (el.value) { values[el.name].push(el.value); }
          break;
        }
        case 'select-multiple': {
          values[el.name] = Array.from(el.options).map(o => o.value);
          break;
        }
        case 'radio': {
          if (el.checked) { values[el.name] = el.value; }
          break;
        }
        default: {
          values[el.name] = el.value;
          break;
        }
      }
    }
    return values;
  }, {});
}
