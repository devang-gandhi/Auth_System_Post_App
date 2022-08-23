import {config} from 'dotenv';

const {parsed} = config();

export const {
    PORT, 
    MODE,
    DB = 'mongodb://localhost:27017/gql',
    IN_PROD = MODE != 'prod',
    SECRET
} = parsed;