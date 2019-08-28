<h1 align="center">
    <br>
    <a href="https://github.com/ktuapp/api"><img src="https://i.ibb.co/TwQgW51/logo.png" height="120" alt="KTU APP"></a>
    <br>
    KTU APP API
    <br>
</h1>

<h4 align="center">API to get APJ Abdul Kalam Technological University (KTU) students grades,basic details etc.</h4>

## How to start
### Install node modules
`npm install`
### Create .env file in root location of project
`touch .env`
```
PORT=3000
NODE_ENV=development
REDIS_PORT=6379
REDIS_HOST=host.docker.internal
IMAGE_PATH=
IMAGE_URL=
API_KEY=
FIREBASE_DB_URL=
SLACK_TOKEN=
SLACK_CHANNEL=
```
### Start project
`npm start`

### Running in developement with nodemon
`npm run dev`

### Running test
`npm run test`
