# SafeToSwim
A service that tracks harmful algal blooms (HAB).

## Getting started
### To run the service...
1. Start the server: Run flask_server.py from the 'servers' directory
2. Call the service: 
   1. In a browser go to localhost:5000/predict
   2. Or call post.bat in the 'clients' directory   
   
### To run the mobile client...
1. Install Expo on your phone from Google Play or the iOS App Store.
2. Install the Expo NPM module globally.  https://expo.io/learn
3. cd into app/safe-to-swim.
4. Execute `exp start`
5. Scan the resulting QR code with the Expo app on your phone.

## Roadmap
1) Identify algae blooms
   1. In Lake Champlain from user-uploaded images.
   2. From images uploaded by other users
2) Serve data about presence of HABs through server API
