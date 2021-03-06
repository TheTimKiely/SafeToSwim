# SafeToSwim
A service that tracks harmful algal blooms (HAB).

## Getting started

### Run the service using Docker
1. You'll need a Docker Account (free) : https://docs.docker.com/
2. Install Docker & Docker Compose following the official instructions for your platform: https://docs.docker.com/compose/install/
3. Clone the repo.
4. `cd safetoswim`
5. `docker-compose up` (You may need to login on the CLI first)
6. After setup, point your browser to http://localhost:5000/predict


### To run the service...
1. Start the server: Run flask_server.py from the 'servers' directory
2. Call the service:
   1. In a browser go to localhost:5000/predict
   2. Or call post.bat in the 'clients' directory

### To run the mobile client...
1. Install Expo on your phone from Google Play or the iOS App Store.
2. Install the Expo NPM module globally.  https://expo.io/learn
3. cd into app/safe-to-swim.
4. On iOS :
      1. Execute `exp start --send-to <your phone number or email>`
      2. Open the  link you receive via text message or email.
5. On Android :
      1. Execute `exp start`
      2. Scan the resulting QR code with the Expo app on your phone.

### To view the latest build of the mobile client
 1. Load the Expo app on your phone:

    iOS : https://itunes.apple.com/app/apple-store/id982107779

    Android : https://play.google.com/store/apps/details?id=host.exp.exponent

 2. Send yourself a link (iOS) or scan the barcode (Android) from this webpage : https://expo.io/@johnneed/safe-to-swim


## Roadmap
1) Identify algae blooms
   1. In Lake Champlain from user-uploaded images.
   2. From images uploaded by other users
2) Serve data about presence of HABs through server API