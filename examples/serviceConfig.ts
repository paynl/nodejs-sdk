import { createPayNLClient } from '../src';

const payNL = createPayNLClient({ password: 'your-api-token' });

const config = await payNL.Service.getConfig('SL-1234-5678');

console.log(config);
