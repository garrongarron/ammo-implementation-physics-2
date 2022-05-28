const urlParams = new URLSearchParams(window.location.search);
const sufix = localStorage.getItem('sufix') || Math.random().toString().slice(2,5)
localStorage.setItem('sufix', sufix)
let tmp = (urlParams.get('name')) ? urlParams.get('name') : 'someone' 
tmp += '-'+sufix
const nick = tmp
export default nick