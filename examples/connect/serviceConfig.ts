import { createPayNLClient } from '../../src';

const payNL = createPayNLClient({ apiToken: 'your-api-token', serviceId: 'SL-1234-5678' });

const config = await payNL.Service.getConfig('SL-1234-5678');

console.log(config);
