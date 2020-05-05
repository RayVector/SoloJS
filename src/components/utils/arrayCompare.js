const oldValue = mutation.oldValue.split(';');
const newValue = mutation.target[mutation.attributeName].cssText.split(';');
const changed = newValue.filter((newValueItem, newValueItemIndex) => {
  return newValueItem !== oldValue[newValueItemIndex] && newValueItem !== '' && newValueItem !== ' '
}).map(Function.prototype.call, String.prototype.trim);
console.log('changed:', changed)