import { Connection, Client } from '@temporalio/client';

class temporalConnection {
  client = async () => {
    const connection = await Connection.connect({
      address: process.env.URL_TEMPORAL,
    });
    const client = new Client({
      connection,
      namespace: process.env.NAMESCAPE_TEMPORAL, // connects to 'default' namespace if not specified
    });
    return client;
  };
}

export default new temporalConnection();
