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
	git push origin
	make push-desktop-client-common

push-desktop-client-common:
	git subtree push --prefix desktop-app/src/client-common $(CLIENT_COMMON) desktop-app
pull-desktop-client-common:
	git subtree pull --prefix desktop-app/src/client-common $(CLIENT_COMMON) master

push-ios-client-common:
	git subtree push --prefix ios-app/src/client-common $(CLIENT_COMMON) ios-app
pull-ios-client-common:
	git subtree pull --prefix ios-app/src/client-common $(CLIENT_COMMON) master

gittor-remote-add:
	git remote add gittor https://github.com/episodeyang/gittor.git
gittor-push:
	git subtree push --prefix gittor https://github.com/episodeyang/gittor.git escherpad-mono-repo
gittor-clone:
	git subtree add --prefix gittor https://github.com/episodeyang/gittor.git master
gittor-pull:
	git subtree pull --prefix gittor https://github.com/episodeyang/gittor.git master
