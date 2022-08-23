import {gql} from 'apollo-server-express';

import baseDef from './baseDef';
import post from './post';
import user from './user';

export default [
    baseDef,
    post, 
    user
];