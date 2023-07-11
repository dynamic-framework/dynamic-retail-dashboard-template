import { liquidParser } from '@modyo-dynamic/modyo-design-system';

export const SITE_URL = liquidParser.parse('{{site.url}}');
export const TRANSFER_PATH = liquidParser.parse('{{vars.transfers-path}}');
export const TRANSFER_URL = `${SITE_URL}/${TRANSFER_PATH}`;
