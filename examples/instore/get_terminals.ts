import * as Paynl from '../../src/index';

Paynl.Config.setApiToken('your token');

Paynl.Instore.getTerminals()
    .forEach(terminal => {
        console.log(terminal.id + ' ' + terminal.name);
    })
    .catch(error => console.error(error));
