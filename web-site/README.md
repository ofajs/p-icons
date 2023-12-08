## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/material-ui-vite
cd material-ui-vite
```

Install it and run:

```bash
npm install
npm run dev
```

or:

<!-- #default-branch-switch -->

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-ui-vite)

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui/material-ui/tree/master/examples/material-ui-vite)

## How to Deploy web-site

We have defined a `GitHub Actions` event trigger using `on: workflow_dispatch`. It specifies a manual trigger event, allowing the workflow to be triggered manually via the GitHub interface.

Specifically, when you click on the `Actions` tab on the repository page in GitHub, and then select the relevant workflow, a `Run workflow` button will appear. When you click this button, it will trigger the event associated with that workflow.

