# ryke
Hack the wall competition entry

### Usage

Requirements

Webserver:
1) apache/nginx or similar: serve static files, must be setup to serve contents of the root directory with .js and .html endings as well as everything in the resources directory
2) node.js: Hosts the wss server.
  
 Example Ngnix config file
 
 ```
 server {
        listen 80;
        listen [::]:80;

        server_name ryke.xyz; #domain name

        location / {
#               expires 1d;
                alias /var/www/ryke/; #path to project root
        }

        location /socket.io {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
        }
}

server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;

        ssl on;
        ssl_certificate #path to certificate chain
        ssl_certificate_key #path to certificate key

        ssl_ciphers #cipher list
        ssl_protocols #protocal list

        server_name ryke.xyz; # domain name

        location / {
#               expires 1d;
                alias /var/www/ryke/; #Path to project root
        }

        location /socket.io {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
        }
}
```

Websocket server installation instructions:
1) enter the `server` directory using windows command prompt or linux terminal
2) execute `npm install`
3) execute `node server.js` (pm2 is highly recommended for production environments.)