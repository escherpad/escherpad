CLIENT_COMMON=https://github.com/escherpad/client-common.git

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
	make push-desktop-client-common
push-desktop-client-common:
	git subtree push --prefix desktop-app/src/client-common $(CLIENT_COMMON) desktop-app
pull-desktop-client-common:
	git subtree pull --prefix desktop-app/src/client-common $(CLIENT_COMMON) master
clone-gittor:
	git subtree add --prefix gittor https://github.com/episodeyang/gittor.git master
