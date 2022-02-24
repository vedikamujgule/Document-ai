ng build --prod --output-hashing=all --configuration=dev --extract-css=false
# ng build --prod --output-hashing=all --configuration=prod --extract-css=false

sh appengine_deploy.sh trns
