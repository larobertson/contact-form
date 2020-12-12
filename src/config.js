import _ from 'lodash';


const development = {
  host: 'http://localhost:4444'
}

const production = {
  host: '',
  port: ''
}

export let env = {};
if (process.env.NODE_ENV === 'development') {
    _.merge(env, development);
} else {
    _.merge(env, production);
}