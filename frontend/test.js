const http = require('https');
const urls = [
  'https://images.unsplash.com/photo-1445205170230-053b83016050',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809',
  'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77',
  'https://images.unsplash.com/photo-1574634534894-89d7576c8259',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
  'https://images.unsplash.com/photo-1554412933-514a83d2f3c8',
  'https://images.unsplash.com/photo-1485230895905-ef350325f0a2',
  'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b'
];
urls.forEach(url => {
  http.get(url, res => {
    console.log(res.statusCode + ' - ' + url);
  }).on('error', e => console.log('ERROR - ' + url));
});
