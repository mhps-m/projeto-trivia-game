import { MD5 } from 'crypto-js';

// Converte um elemento para uma hash MD5 e converte essa hash em string
const convertToMD5 = (element) => MD5(element).toString();

export default convertToMD5;
