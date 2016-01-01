@echo running a gulp process
call gulp
@echo gulp process ended

@echo deploying to firebase

call firebase deploy
@echo deployed successfully 