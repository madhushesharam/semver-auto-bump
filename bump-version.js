const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// Path to the version file (package.json by default)
const versionFile = core.getInput('version-file');
const versionFilePath = path.resolve(process.cwd(), versionFile);

// Utility function to get the current version from package.json (or another file)
function getCurrentVersion() {
  const packageJson = require(versionFilePath);
  return packageJson.version;
}

// Utility function to update the version in the version file (package.json)
function updateVersion(newVersion) {
  const packageJson = require(versionFilePath);
  packageJson.version = newVersion;
  fs.writeFileSync(versionFilePath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`Version updated to ${newVersion}`);
}

// Parse the commit messages to determine the type of version bump
function getVersionBumpType() {
  const commitMessages = execSync('git log --oneline --no-merges HEAD^..HEAD').toString();
  if (commitMessages.includes('BREAKING CHANGE:')) {
    return 'major';
  } else if (commitMessages.includes('feat:')) {
    return 'minor';
  } else if (commitMessages.includes('fix:')) {
    return 'patch';
  } else {
    return null;
  }
}

// Function to increment version based on type
function incrementVersion(version, bumpType) {
  const [major, minor, patch] = version.split('.').map(num => parseInt(num, 10));

  switch (bumpType) {
    case 'major':
      return `${major + 1}.0.0`; // Major bump: reset minor and patch to 0
    case 'minor':
      return `${major}.${minor + 1}.0`; // Minor bump: reset patch to 0
    case 'patch':
      return `${major}.${minor}.${patch + 1}`; // Patch bump: increment patch
    default:
      return version; // No change
  }
}

try {
  const currentVersion = getCurrentVersion();
  const bumpType = getVersionBumpType();

  if (bumpType) {
    const newVersion = incrementVersion(currentVersion, bumpType);
    updateVersion(newVersion);
    core.setOutput('new-version', newVersion);
  } else {
    console.log('No version bump detected based on commit messages.');
  }
} catch (error) {
  core.setFailed(error.message);
}
