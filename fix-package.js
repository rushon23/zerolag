const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const toRemove = [
  'vue', 'vue-router', 'svelte', '@sveltejs/kit', '@remix-run/react', 'three', 'nodemailer'
];

toRemove.forEach(dep => {
  delete pkg.dependencies[dep];
});

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
