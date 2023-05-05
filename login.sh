echo "Logging in"

curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login

curl -v https://dev.stedi.me/validate/61fdf251-b885-438a-8b7b-e85934884838
