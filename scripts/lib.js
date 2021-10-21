const { readdir, stat } = require('fs').promises;
const { join } = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Get all directories under a path
 *
 * @param {string} path
 * @return {string[]}
 */
const getDirectories = async (path = '') => {
  const out = [];
  for (const file of await readdir(path)) {
    if ((await stat(join(path, file))).isDirectory()) {
      out.push(file);
    }
  }
  return out;
};

exports.getDirectories = getDirectories;

/**
 * Returns bytes as KiB.
 *
 * @param {Number} bytes
 * @return {String}
 */
const bytesToKB = (bytes) => {
  return `${(bytes / 1024).toFixed(2)}KiB`;
};

exports.bytesToKB = bytesToKB;

/**
 * Returns a Promise that resolves at the end of a stream
 *
 * @param {Stream} stream
 * @return {Promise}
 */
const awaitStream = (stream) =>
  new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });

exports.awaitStream = awaitStream;

/**
 * Get the current git branch
 *
 * @returns {[Error|null, String|null]}
 */
const getLastGitBranch = async () => {
  const branch = process.env.BITBUCKET_BRANCH;

  if (branch) {
    return [undefined, branch];
  }

  const { stdout, stderr } = await exec('git rev-parse --abbrev-ref HEAD');
  return [stderr && new Error(stderr), stdout && stdout.trim()];
};

exports.getLastGitBranch = getLastGitBranch;

/**
 * Get the last git commit hash
 *
 * @returns {[Error|null, String|null]}
 */
const getLastGitCommitHash = async () => {
  const hash = (process.env.BITBUCKET_COMMIT || '').slice(0, 7);

  if (hash) {
    return [undefined, hash];
  }

  const { stdout, stderr } = await exec('git rev-parse --short HEAD');
  return [stderr && new Error(stderr), stdout && stdout.trim()];
};

exports.getLastGitCommitHash = getLastGitCommitHash;
