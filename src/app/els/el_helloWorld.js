const styles = {
  userSelect: 'none',
  fontSize: '2rem',
  cursor: 'pointer'
};


export default {
  id: '',
  node: 'span',
  content: 'Hello world, im body element',
  styles,
  methods: {
    click: (e) => e.target.innerHTML = 'Magic JS!',
  }
};
