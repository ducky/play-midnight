const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const { spawn } = require('child_process');

const BUILD_DIRECTORY = `deploy`;

const NORMALIZED_ROOT = path.normalize(`${__dirname}/..`);
const NORMALIZED_DIRECTORY = path.normalize(`${NORMALIZED_ROOT}/${BUILD_DIRECTORY}`);

const BUILD_COMMAND = `parcel build src/play-midnight.js --no-cache --out-dir ${NORMALIZED_DIRECTORY}/build`;
const BUILD_BG_COMMAND = `parcel build src/background.js --no-cache --out-dir ${NORMALIZED_DIRECTORY}/build`;

const copyRoot = async fileName => {
  try {
    console.log(`\n${NORMALIZED_ROOT}/${fileName} -> ${NORMALIZED_DIRECTORY}/${fileName}`);
    await fs.copy(`${NORMALIZED_ROOT}/${fileName}`, `${NORMALIZED_DIRECTORY}/${fileName}`);
    console.log(chalk.green(`✅  Success!`));
  } catch (e) {
    console.log(chalk.red(`❌  ERROR - Failed to copy file '${fileName}'`));
  }
};

const exec = (cmd, name = '') => {
  const getParts = cmdStr => {
    const parts = cmdStr.split(' ');
    return {
      command: parts[0],
      args: parts.slice(1),
    };
  };

  const { command, args } = getParts(cmd);
  const BUILD_PROCESS = spawn(command, args, {
    cwd: NORMALIZED_ROOT,
    stdio: [process.stdin, process.stdout, 'pipe'],
  });

  BUILD_PROCESS.stderr.on('data', data => {
    console.log(chalk.red(`❌  ERROR - ${data}`));
  });

  BUILD_PROCESS.on('close', data => {
    console.log(chalk.green(`✅  ${name} Success!`));
  });
};

const build = async () => {
  try {
    console.log(chalk.cyan('\n🎉  Starting Bundle Task 🎉  '));

    console.log(chalk.blue(`\nRemoving Deploy Directory '${NORMALIZED_DIRECTORY}'`));
    await fs.remove(NORMALIZED_DIRECTORY);
    console.log(chalk.green(`✅  Success!`));

    console.log(chalk.blue(`\nCreating Deploy Directory '${NORMALIZED_DIRECTORY}'`));
    await fs.ensureDir(NORMALIZED_DIRECTORY);
    console.log(chalk.green(`✅  Success!`));

    console.log(chalk.blue(`\nCopying package.json`));
    await copyRoot('package.json');

    console.log(chalk.blue(`\nCopying manifest.json`));
    await copyRoot('manifest.json');

    console.log(chalk.blue(`\nCopying Icons`));
    await copyRoot('icon16.png');
    await copyRoot('icon48.png');
    await copyRoot('icon128.png');

    console.log(chalk.blue(`\nRunning Build`));
    console.log(chalk.blue(BUILD_COMMAND));
    exec(BUILD_COMMAND, 'Build');

    console.log(chalk.blue(`\nRunning Background Build`));
    console.log(chalk.blue(BUILD_BG_COMMAND));
    exec(BUILD_BG_COMMAND, 'Background Build');
  } catch (err) {
    console.log(chalk.red(`❌  Build Failed!`));
    console.log(chalk.red(`❌  ERROR - ${err}`));
  }
};

build();
