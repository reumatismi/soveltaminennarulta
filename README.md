## Tuokio
# Soveltaminen narulta

A project for Metropolia UAS course Web-teknologian peruskoseptit (Basic Consepts of Web-technology). 

## The project
Tuokio is a web-based media sharing and learning environment for elementary school students
and their teachers. The app is designed to provide kids with a "gamified" user experience
with a plethora of different educative minigames, of which this demo version contains two -
a odd/even numbers game and an adventure game with multiple endings.

To keep the app and it's users in check, all media posts and comments must be approved by
a teacher before they are visible.

At the moment the app is geared towards Finnish speaking students. The full version will
have support for multiple languages.

## Target group
Primary: Elementary school pupils between ages 6 and 9.
Secondary: Teachers and principals.

## Target devices
Mobile phones and other handheld devices.

### Instructions for installation and local testing

To test the app you will need an active SQL DB (MariaDB etc.) and some tables with
placeholder user data. The SQL script to create the neccessary tables and inserts
can be found in the db-folder. The app is currently designed to use an external
database. The Node-server (backend) and UI (frontend) are designed to to be run
from a single computer.

1. Get the project repo

Download the repo from GitHub as a zip and unpack into your preferred folder.
Alternatively open your terminal (Mac and Linux users) or gitbash (PC), navigate to your chosen install folder and
clone the repo with the following command:
   ```sh
   git clone https://github.com/reumatismi/soveltaminennarulta.git
   ```
2. Install app dependecies

In your project folder, navigate to /back. This is from which you will run the app.
Open your terminal (or GitBash) and type:
   ```sh
   npm i
   ```

3. Database installation and starter data insertion

Use the script in /db folder to create a database and insert default user data. You will
need the default malliopettaja to log in the app and add more users.
	
	```sh
	tuokio.sql
	```sh

4. Create an .env file

In the /back folder, create a new file, name it .env and insert following lines. This
will provide app with instructions on how to reach your database.

	```sh
	DB_HOST=<your db address (ex. sql.example.com)>
	DB_USER=<your db username>
	DB_PASS=<your db password>
	DB_NAME=<your db name>
	HTTP_PORT=3000
	HTTPS_PORT=8000
	NODE_ENV=development
	```sh

5. Create https sertificates

Make sure you are still in the /back folder. Generate certificate keys to enable use of https:
	
	```sh
    openssl genrsa -out ssl-key.pem 2048
    openssl req -new -key ssl-key.pem -out certrequest.csr
    openssl x509 -req -in certrequest.csr -signkey ssl-key.pem -out ssl-cert.pem
	```sh

<!-- CONTACT -->
## Soveltaminen narulta are:

Jon Menna - @keenanjon
Timi Rautio - @kemosab3
Matti Stenvall - @reumatismi

<!-- LICENSE -->
## Soveltaminen narulta
[]() &copy; 2021