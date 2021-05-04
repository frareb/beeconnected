# Déploiement de l'API sur un serveur

Ce guide explique comment effectuer une mise en production de l'API, afin de pouvoir y connecter des *gateways*.
L'entièreté de la procédure a été effectuée sur un serveur CentOS 7 ; toutefois, un administrateur système expérimenté saura modifier les commandes lorsque nécessaire afin d'adapter cette procédure à n'importe quel autre système.

## Configuration préliminaire

### Installation des outils nécessaires

Dans ce guide, nous utiliserons les programmes suivants ; certains d'entre eux peuvent être remplacés, mais la combinaison proposée est recommandée pour une utilisation optimale :

- PostgreSQL, version 12 ou supérieure ;
- Node.js, version 12 ou supérieure ;
- NPM, version 6 ou supérieure ;
- nginx.

Pour utiliser apt-get dans les bash à la place de yum
sudo curl https://raw.githubusercontent.com/dvershinin/apt-get-centos/master/apt-get.sh -o /usr/local/bin/apt-get
sudo chmod 0755 /usr/local/bin/apt-get

On commence par ajouter les dépôts de Node.js, pour avoir les dernières versions (ici, la 14.x LTS) :

```bash
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
```

On installe ensuite les outils sus-mentionnés ; aucune remarque particulière sauf pour PostgreSQL, qui nécessite de suivre [une procédure spécifique](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-7) ; sur CentOS, on fera par exemple :

```bash
yum install nodejs nginx
```

### Création de la base de données PostgreSQL

Toutes les tables nécessaires à l'API sont créées par l'[ORM](https://fr.wikipedia.org/wiki/Mapping_objet-relationnel), mais la base de données, ainsi qu'un utilisateur disposant des pleins droits sur celle-ci, doivent être créés manuellement :

```sql
sudo -u postgres psql
postgres=# CREATE DATABASE beeconnected_api;
postgres=# CREATE USER beeconnected_api WITH ENCRYPTED PASSWORD 'strongPassword';
postgres=# GRANT ALL PRIVILEGES ON DATABASE beeconnected_api TO beeconnected_api;
```

### Activation des services systemd

Pour le lancement automatique au démarrage, on active les services associés à `nginx` et PostgreSQL ; plus tard, une unité sera également crée pour l'API (postgresql-10 installé par l'IRD ; modif du script de postgresql vers postgresql-10):

```bash
systemctl enable postgresql-10
systemctl enable nginx
systemctl start postgresql-10
systemctl start nginx
```

### Configuration de nginx

certificats à mettre manuellement dans /etc/pki/tls/certs/ /etc/pki/tls/private/ ???



A titre indicatif, une configuration possible pour nginx est fournie (/etc/nginx/nginx.conf) ; des ajustements seront sans doute nécessaires avant la mise en production, et il faudra en particulier veiller à la sécurité des données, via une configuration HTTPS sûre.

```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
	worker_connections 1024;
}

http {
	log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
					  '$status $body_bytes_sent "$http_referer" '
					  '"$http_user_agent" "$http_x_forwarded_for"';

	access_log  /var/log/nginx/access.log  main;

	sendfile            on;
	tcp_nopush          on;
	tcp_nodelay         on;
	keepalive_timeout   65;
	types_hash_max_size 2048;

	include             /etc/nginx/mime.types;
	default_type        application/octet-stream;

	# Load modular configuration files from the /etc/nginx/conf.d directory.
	# See http://nginx.org/en/docs/ngx_core_module.html#include
	# for more information.
	include /etc/nginx/conf.d/*.conf;

	server {
		listen       80 http2;
		listen       [::]:80 http2;
		server_name  example.com;
		root         /var/www/beeconnected;

		# Force redirect to the HTTPS website
		return 301 https://$server_name$request_uri;
	}

	server {
		listen       443 ssl http2 default_server;
		listen       [::]:443 ssl http2 default_server;
		server_name  beeconnected.ird.fr;
		root         /var/www/beeconnected;

		ssl_certificate "/path/to/your/tls/cert";
		ssl_certificate_key "/path/to/your/tls/key";
		ssl_session_cache shared:SSL:1m;
		ssl_session_timeout 10m;
		ssl_protocols TLSv1.2 TLSv1.3;
		ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
		ssl_prefer_server_ciphers on;

		location / {
			proxy_pass http://127.0.0.1:3000/;
			proxy_set_header Connection "upgrade";
			proxy_set_header Upgrade $http_upgrade;
		}
	}
}
```

## Installation de l'API et configuration

Ici, nous installerons l'API dans `/var/www/beeconnected` ; la procédure standard consiste soit :

- à cloner directement un répertoire Git, ce qui permet éventuellement de bénéficier des mises à jour automatiques ;
- à récupérer une version, puis à décompresser l'archive sur le serveur.

Nous détaillerons ici la procédure utilisant Git (sudo yum install git) :

```bash
cd /var/www
git clone https://github.com/frareb/beeconnected.git
cd beeconnected && npm ci --only=prod
```

### Création de l'unité systemd

Afin de faciliter la maintenance, et pour permettre le rechargement automatique lors des mises à jours, nous allons créer une unité *systemd* suivant le modèle (à mettre dans `/etc/systemd/system` par exemple avec comme nom beeconnected.service) :

```
[Unit]
Description=beeconnected API server
After=syslog.target
After=network.target
Requires=postgresql-10.service

[Service]
RestartSec=2s
Type=simple
User=nginx
Group=nginx
WorkingDirectory=/var/www/beeconnected
ExecStart=/usr/bin/node bin/www
Restart=always
Environment=NODE_ENV=production DSN=postgres://beeconnected_api:strongPassword@localhost:5432/beeconnected_api PORT=3000

[Install]
WantedBy=multi-user.target
```

Cette unité peut ensuite être activée au démarrage via :

```bash
systemctl enable beeconnected
systemctl start beeconnected
```

### Création d'une règle pour la mise à jour automatique

L'unité ci-dessus n'est pas défaut accessible qu'au superutilisateur ; les mises à jour automatiques dépendent du rechargement de cette unité par l'utilisateur `nginx`, on peut donc ajouter une règle Polkit dans `/etc/polkit-1/rules.d/51-nginx-beeconnected.rules`, afin de permettre au serveur de se relancer lui-même :

```js
// Allow nginx to manage beeconnected.service
polkit.addRule(function(action, subject) {
		if(     action.id == "org.freedesktop.systemd1.manage-units" &&
				action.lookup("unit") == "beeconnected.service" &&
				subject.user == "nginx") {
				return polkit.Result.YES;
		}
});
```

### Génération des premières clefs

Le serveur est maintenant accessible à l'adresse indiquée à `nginx`, mais aucun accès n'est disponible ; pour en créer, il faut se reconnecter à PostgreSQL, puis insérer manuellement deux clefs (au moins une) :

- une clef d'administrateur, permettant un accès complet aux points d'accès ;
- une clef de déploiement pour les hooks Git(hub).

On génère d'abord deux clefs via Node.js à la racine du projet :

```js
const crypto = require("crypto");
const crs = require("crypto-random-string");

// Le contenu de 'a' est la clef administrateur
let a = crs({length: 64, type:"base64"});

// Le hash généré doit être mis en base de données
crypto.createHash("sha256").update(a).digest("base64");

// Le contenu de 'b' est la clef de déploiement,
// elle est inséréer **non-hachée** en base de données.
let b = crs({length: 64, type:"base64"});
```

Une fois les deux clefs obtenues, il suffit de les insérer via :

```sql
sudo -u postgres psql
postgres=# \u beeconnected_api;
beeconnected_api=# INSERT INTO "Groups"(name, description, "createdAt", "updatedAt") VALUES('admin', 'Groupe d''administration, avec accès complet', NOW(), NOW());
beeconnected_api=# INSERT INTO "ApiKeys"(key, description, "createdAt", "updatedAt", "groupId") VALUES('clefAdmin', 'Clef d''administration principale', NOW(), NOW(), 1);
beeconnected_api=# INSERT INTO "Groups"(name, description, "createdAt", "updatedAt") VALUES('deploy', 'Groupe de déploiement', NOW(), NOW());
beeconnected_api=# INSERT INTO "ApiKeys"(key, description, "createdAt", "updatedAt", "groupId") VALUES('clefDeploy', 'Clef pour le déploiement via Github', NOW(), NOW(), 2);
```

## Déploiement automatique via github (optionnel)

Ajouter un GitHub Actions dans .github/workflows/main.yml pour que chaque PUSH entraîne une compilation. 

## Quelques erreurs à ne pas faire

### `npm install`

Sur un serveur, on ne souhaite pas installer les outils de développement, on privilégiera ainsi `npm install --only=prod`. Dans notre cas, on ne souhaite pas que le fichier de verouillage (*lock*) soit mis à jour par le serveur, on fera donc un `npm ci --only=prod`, qui répond à nos deux exigences.

### Des installations globales

Les installations globales via NPM sont à éviter absolument, car elles ne permettent pas de déployer d'autres applications sur le serveur, et ne sont pas mises à jour automatiquement via les *hooks*.

### Lancement des *seeders*

Les *seeders* sont des données utilisées pour les tests, les insérer sur un serveur de production crééra des failles de sécurité, notamment au vu des clefs API simplistes utilisées pour les tests. On privilégiera ainsi l'ajout manuel des données via des points d'accès API.
