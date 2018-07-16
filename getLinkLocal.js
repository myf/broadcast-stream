const os = require('os');
const interfaces = os.networkInterfaces();
const firstLocal = connection_type => {
    let iface_lookup;
    switch (connection_type) {
      case 'wireless':
        iface_lookup = 'w';
        break;
      case 'wired':
        iface_lookup = 'e';
        break;
      default:
        throw new Error("connection_type has to be wireless or wired");
    };
    return Object.entries(interfaces)
  .filter(([iface, addrs]) => iface.startsWith(iface_lookup) && addrs.some(({family}) => family
=== 'IPv6'))
  .map(([iface, addrs]) => addrs.find(({address}) => address.startsWith('fe80')))
}

module.exports = firstLocal;
