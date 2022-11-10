import { MD5 } from 'crypto-js';

const convertToMD5 = (email) => MD5(email).toString();

export default convertToMD5;
