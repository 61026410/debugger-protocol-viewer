'use strict';

/**
 * Utility command that creates HTML file in the _domains folder for each domain found in the _data/?/protocol.json.
 */

const fs = require('fs');
const DOMAINS_FOLDER = '_domains/';
const VERSIONS_FILE = '_data/versions.json';

const versionsText = fs.readFileSync(VERSIONS_FILE);
const versions = JSON.parse(versionsText);

versions.forEach(version => {
  clearFolder(`${DOMAINS_FOLDER}/${version.folder}`);
  generateDomainFiles(version);
});

function clearFolder(path) {
  fs.readdirSync(path).forEach((file, index) => fs.unlinkSync(`${path}/${file}`));
}

function generateDomainFiles(version) {
  const protocolFile = `_data/${version.folder}/protocol.json`;
  const protocolText = fs.readFileSync(protocolFile);
  const protocol = JSON.parse(protocolText);

  (protocol.domains).forEach((domain, idx) => {
    const name = domain.domain;
    const fileName = `${DOMAINS_FOLDER}/${version.folder}/${name}.html`;
    const content = `---
title: ${name}
version: ${version.folder}
version_name: ${version.name}
idx: ${idx}
---`;

    fs.writeFileSync(fileName, content);
  });
}
