#!/bin/bash

GIT_COMMIT=$1

# Path to the Node API directory
API_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/.."

# Checkout the requested commit
cd ${API_DIR}
git checkout .
git fetch --all
git reset --hard origin/deploy

npm ci --only=prod

# Restart the API service
systemctl restart beeconnected
