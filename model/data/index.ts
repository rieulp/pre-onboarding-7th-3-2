import accountStatusData from './accountStatus.json';
import brokerFormatData from './brokerFormat.json';
import brokersData from './brokers.json';

export type AccountStatus = keyof typeof accountStatusData;
export type BrokerFormat = keyof typeof brokerFormatData;
export type Broker = keyof typeof brokersData;

export { accountStatusData, brokerFormatData, brokersData };
