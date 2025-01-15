# SemVer AutoBump

## Overview

**SemVer AutoBump** is a GitHub Action that automatically bumps your project's version based on **Semantic Versioning 2.0.0** principles. It inspects your commit messages to determine whether the version should be bumped for a **major**, **minor**, or **patch** release.

### Semantic Versioning 2.0.0 Guidelines

- **MAJOR version** is incremented when you make incompatible API changes.
- **MINOR version** is incremented when you add functionality in a backward-compatible manner.
- **PATCH version** is incremented when you make backward-compatible bug fixes.

**SemVer AutoBump** uses the following commit message conventions to determine the type of version bump:
- **`feat:`** triggers a minor version bump.
- **`fix:`** triggers a patch version bump.
- **`BREAKING CHANGE:`** triggers a major version bump.

## Inputs

- **`version-file`**: The file that contains the version of your project (e.g., `package.json`). This file will be updated with the new version number. Default is `package.json`.

## Outputs

- **`new-version`**: The new version number after the bump. The version will be in the format `MAJOR.MINOR.PATCH`.

## Example Usage

This action can be used in a GitHub Actions workflow to automatically update the version number when commits are pushed.

### Example Workflow (`.github/workflows/version-bump.yml`):

```yaml
name: Auto Version Bump

on:
  push:
    branches:
      - main

jobs:
  version-bump:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Run SemVer AutoBump
        uses: ./  # Uses the action in the current repository
        with:
          version-file: 'package.json'

```

How it Works
When you push changes to the repository, the action is triggered.
The action reads the commit messages between the latest and the previous commits.
Depending on whether the commits contain:
feat: (for features), it bumps the minor version.
fix: (for fixes), it bumps the patch version.
BREAKING CHANGE: (for breaking changes), it bumps the major version.
The version is updated in the specified file (e.g., package.json), and the new version is outputted.
Notes
The action works with any file containing a version key, but it is typically used with package.json.
You should follow the commit message conventions:
feat: for new features.
fix: for bug fixes.
BREAKING CHANGE: for breaking changes in the API.
Local Development and Testing
1. Cloning the Repository
To develop and test the action locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/<your-username>/semver-auto-bump.git
cd semver-auto-bump
Install the necessary dependencies:

bash
Copy code
npm install
2. Testing Locally
To test the action locally before publishing it, follow these steps:

A. Set up a Local Workflow to Test the Action
Create a GitHub Actions workflow in your local repository or a separate test repository to call this action.

Example: .github/workflows/test-version-bump.yml

yaml
Copy code
name: Test Version Bump

on:
  push:
    branches:
      - main

jobs:
  test-version-bump:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Run SemVer AutoBump
        uses: ./  # Uses the action in the current directory
        with:
          version-file: 'package.json'
B. Run GitHub Actions Locally (Optional)
If you want to test the action without pushing changes to GitHub, you can use act, a tool for running GitHub Actions locally.

Install act:

For Mac: brew install act
For Windows: Download from the releases page.
Run your workflow locally:

bash
Copy code
act -j test-version-bump
C. Debugging the Action
If you need to debug, add some logging to your bump-version.js script to ensure it works as expected:

javascript
Copy code
console.log('Current commit messages:', commitMessages);
You can also test the action by manually running it with node:

bash
Copy code
node bump-version.js
3. Version Testing
Before pushing your action to the marketplace, test with different commit messages to ensure it correctly bumps the version based on feat, fix, and BREAKING CHANGE. You can do this by creating a few different branches and making the corresponding commits:

git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "BREAKING CHANGE: update API"
4. Run Tests and Push Changes
Once the action works as expected, commit and push your changes to your repository:

bash
Copy code
git add .
git commit -m "Add SemVer AutoBump action"
git push origin main
How to Push the Action to GitHub Marketplace
Prepare the Action for Publishing

Before you can publish your action to the GitHub Marketplace, ensure that your action.yml file includes all necessary details, such as name, description, and inputs/outputs. Additionally, verify that the action is working locally.

Publish the Action to GitHub Marketplace

To push your action to the GitHub Marketplace:

Go to your repository's page on GitHub.
Click on the "Actions" tab and verify that your action works by running a workflow.
On the "Actions" page, select the action you want to publish.
Click on the "Publish to Marketplace" button (this will take you through the marketplace publishing steps).
You'll need to fill out the following information:

Action Name: SemVer AutoBump
Description: GitHub Action to automatically bump version based on commits (Semantic Versioning 2.0.0)
Category: Select an appropriate category (e.g., "CI/CD").
Visibility: Choose whether your action will be public or private.
Maintain and Version Your Action

Once published, you may want to maintain and version your action:

If you need to update the action, make changes to your code, bump the version number (e.g., 1.0.1, 1.1.0, 2.0.0), and push your changes to GitHub.
After each update, you can publish new versions to the GitHub Marketplace.
How to Upgrade and Use Different Versions
To upgrade or use a specific version of the action in your workflow, simply specify the version tag in the uses field of your GitHub Actions workflow file.

Example of Using Version 1.0.0:
yaml
Copy code
uses: <your-username>/semver-auto-bump@v1.0.0
Example of Using the Latest Version (e.g., 1.1.0):
yaml
Copy code
uses: <your-username>/semver-auto-bump@v1.1.0
Example of Using the Latest Commit (Not Recommended for Production):
yaml
Copy code
uses: <your-username>/semver-auto-bump@main
Important: Always specify a version tag or a commit SHA (@<commit-sha>) to ensure that you are using a stable version in your workflows.

License
This action is licensed under the MIT License.

yaml
Copy code

---

This full project structure, code, and README have been updated to reflect the new name **SemVer AutoBump**. Let me know if you need any more adjustments!





