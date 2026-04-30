# frontend-worship-decisions

Frontend of the worship decisions application

## Environment variables

The [static-file-service](https://github.com/mu-semtech/static-file-service?tab=readme-ov-file#how-to-configure-an-ember-application-at-runtime-using-environment-variables) docker image (which we use to host the frontend) supports configuring environment variables. The following options are available.

### ACM/IDM

| Name                        | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| `EMBER_ACMIDM_CLIENT_ID`    | The unique client id for a specific environment                            |
| `EMBER_ACMIDM_BASE_URL`     | The URL where users will be redirected to when they want to log in         |
| `EMBER_ACMIDM_REDIRECT_URL` | The callback URL that ACM/IDM will use after the user logs in successfully |
| `EMBER_ACMIDM_LOGOUT_URL`   | The URL where users will be redirected to when they want to log out        |

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd frontend-worship-decisions`
- `npm install`

## Running / Development

- `npm run start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Environment proxies

To proxy to a specific environment, add a .env.local file with a `PROXY` environment variable. After that, `npm start` should proxy to the correct url.

```
#.env.local

# DEV
PROXY=https://dev.databankerediensten.lokaalbestuur.lblod.info/
# QA
PROXY=https://databankerediensten.lokaalbestuur.lblod.info/
```

### Code Generators

Make use of the many generators for code, try `npm exec ember help generate` for more details

### Running Tests

- `npm run test`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `npm exec vite build --mode development` (development)
- `npm run build` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [Vite](https://vite.dev)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
