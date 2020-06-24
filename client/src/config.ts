// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '5qsvsnels6'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-qs4vggpx.auth0.com',            // Auth0 domain
  clientId: 'EJL3iR2nzFAM5jIYpn4lZnwadAmzIMhe',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
