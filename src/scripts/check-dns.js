const dns = require('dns').promises;
const url = require('url');
require('dotenv').config();

async function run() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('MONGO_URI not set in .env');
      process.exit(1);
    }

    // Extract host from mongodb+srv://... host portion
    const match = mongoUri.match(/^mongodb\+srv:\/\/([^\/\?]+)/i);
    if (!match) {
      console.error('MONGO_URI does not appear to be an srv connection string');
      process.exit(1);
    }

    const host = match[1].split('@').pop();
    console.log('Testing SRV lookup for host:', host);

    const srvName = `_mongodb._tcp.${host}`;
    try {
      const records = await dns.resolveSrv(srvName);
      console.log('SRV records resolved by Node DNS:', records);
    } catch (err) {
      console.error('SRV resolution failed in Node DNS:', err);
    }

    // Also try resolving A record for host
    try {
      const a = await dns.lookup(host);
      console.log('A record lookup result:', a);
    } catch (err) {
      console.error('A record lookup failed in Node DNS:', err);
    }

    process.exit(0);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

run();
