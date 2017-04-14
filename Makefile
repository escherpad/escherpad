default:
	make install

install:
	cd desktop-app
	npm install
pull:
	git pull
	make pull-client-common
push:
	git push
	make push-client-common
push-client-common:
	git subtree push --prefix desktop-app/src/client-common https://github.com/escherpad/client-common.git master
pull-client-common:
	git subtree pull --prefix desktop-app/src/client-common https://github.com/escherpad/client-common.git master
