// const { BigQuery } = require('@google-cloud/bigquery');

const { BigQuery } = require("@google-cloud/bigquery");

//require('dotnet').config();
 
const bigquery = new BigQuery({
  credentials: {
    type: "service_account",
    project_id: "amazon-scraper-358216",
    private_key_id: "525fe1458b6fb4406213b5d7a98f2c701bec678a",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfbYJp3APjLS/X\njKqR+E39vFQn/QHgNQ8El2Ny7rfEglS7PI6Zvdp+gFb5u15tLGm8IvaIxn7r9882\nsVQgyGrQG+uNZzuW/Oc0TGWFGEAiL0gxrHu95xpEXvRc/VT+jYY7uTOQIBaEv9un\nQr7k7P6uB6ER3oFmrXURMF7X8MvdL/kNcYzV9BP8H3tPIm0VtKAdpPsYr7iDRHo/\netw/RTBBfp1ujFj6QHVTE8QyWErQTJ4ft3BL66aNaGpSNydALo/wV3uSGS72+8GG\nMrgNaZrPL7Py+Ncl/ebEF9yFefP+dcuceP4Dcf6SHVaL7Sr+A2ODK6fLsJf6N4Wh\ns9VFTUWJAgMBAAECggEAGKvPohTTW7svnzjp1M3QVDD+3J40HifTDV9ncdd+SfVX\nmd0+pHyxqxT3ha1KPfqQ1QofTaHC02zntVMGG8tFpXk6chYbdGQKEQemkM3JYdJK\nwdbD9dzrqkUPQqgOlz/VZLQ3R2DjsQDme6UDzeTa3SimgSyf/qXaBBiNQIGsYTNS\nqtsyLWfWyzhBMedEKVLTwiZzXktjPJusOb3xLa3goQwtgp8EBTHevLS84RO8edJN\nUQxAs7Ak/laOTN9e8BMFVAQ06imu9kUNWYympcjiLuRP63Po5uP7F/gmEbiUXG2u\nLxvVT7WrXrXHQsW4DGaIgmpod5JGzk9ZbWpPCDYRCQKBgQD9eBEyqH1j8XrZAQg0\ncHu5zkTMaDtlzfLKb1SOh0prHnnX1IYyJ6uHkhuO57mej/iCqS98LRgTny8F61Sj\nVFXy2KN6EpaZbgFu+uNAQvGtCp0oiGPHDiCu0Se3c8oeJ+ypkLBG37TCspUZiPvF\nwgrL6Q512nKHwfRD5EaaBWG8JwKBgQDhqKYlkJvHEaJI2M4LP+tXkjRJaB7NS8Yc\n9IJ1lp5bzaQbRrVIzJJiVKss2uf2ghNgj/gsWId4GVPOjF7s72KZTlzg8Ix5GEt8\nsLzRcLnSj3HUOivR/iyH4CUozMa1X/q8s/VGBnX5JEjw40JUM+KIbYIyLc1qK6PX\nR7To5qQOzwKBgA0HpBKvmKqPmloXdH2FnsahdOXxIcSM/sMrT/R3vfqduXO/6Boh\n8e5pM2N4RBGDoynMWrWOd+NiVn9+Zn5y8mwmeNjopbdDcW1sFkySZGwZ1JRl1oNA\nFawG8ny6xhQgx0i8OGOcUmWD2qhSY2b6H6X12Bl03lhePxlSXdLDHhAXAoGBAJut\nuvn9esrqangxQmzWaykeD355G47scL/3G629/IA/LbE3pceUgoTd/r3SQ+d3s6CR\nklgdt0/uwTek9bQmLnKvcjopGfBNB379ezZOu5P9LD2K6EJWRSh0RY6RP6FPlu7q\nhBMMUAVSuBOf5Vmr9ePDEOhHWwidFMpniPKIc7RXAoGBALUDJA2EnhiTkEKvtYjs\nQY6O93jwOFTYRA4ni5S/Zs8ZpqFuQ/Bimjox/ONnkbQJ83RD6xADH1/NzmypZKAk\n55GXnC20owxczQBusnnXOQ85U++pchy75BQseJZH7TGVGH/JclkNqmLxYLBHrW92\nMBUl53B7lhFGvX/1jiTLxXWp\n-----END PRIVATE KEY-----\n",
    client_email: "amzscraper@amazon-scraper-358216.iam.gserviceaccount.com",
    client_id: "117881553743783097033",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/amzscraper%40amazon-scraper-358216.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  },
  projectId: "amazon-scraper-358216"
});

module.exports = bigquery;

