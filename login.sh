echo "Logging in"

curl --insecure -v -d "@login.json" POST -H "Content-Type:application/json" http://localhost:3000/login

##curl -v https://dev.stedi.me/validate/61fdf251-b885-438a-8b7b-e85934884838
