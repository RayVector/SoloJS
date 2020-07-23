const styles = {
  marginLeft: '10px',
};

const methods = {
  input: (e, bindEl) => bindEl ? bindEl.innerHTML = e.target.value : null
};

export default {
  bind: 'userNameResult',
  node: 'input',
  styles,
  methods
};