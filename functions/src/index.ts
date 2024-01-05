import { onRequest } from 'firebase-functions/v2/https';
import { genRSS } from './functions/rss';

exports.genRSS = onRequest(genRSS);
