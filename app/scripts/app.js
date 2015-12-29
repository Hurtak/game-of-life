import defaultImport from './module1.js';
import {second as namedImport}  from './module2.js';

console.log('console log from app.js');
defaultImport();
namedImport();
