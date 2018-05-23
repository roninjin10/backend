import elasticsearch from 'elasticsearch'
import domain from './config/config'

const client = new elasticsearch.Client({
  host: domain,
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

export default client;
