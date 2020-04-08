# StateTravel-ServerApp


User Stories


1) user is sent to the '/' page where they will be presented with a LOG IN option, a REGISTER option, and an option to see a STATE LIST. The user will read how to use the site and see a greeting. 

2) If the user selects the "/STATES" route they will be taken to a template that shows all 50 of the states as well as a picture of their flag. If the user clicks on a state they will be routed to the states ID page. '/STATES/:ID' 

3) In the states template there will be the model of the state wich includes name, capital, pop, top attractions, and the state bird. There will also be a section to leave comments at bottom. If the user (not logged in at this point) tries to leave a comment they will be taken to the login template. 

4) The login will have a spot to register a username and password. If the username is already in use it will indicate that it is so on the page. If the username is good and the password is good then it will tell the user that they have been logged in. <!-- (STRETCH: If the email adress is alreay in use on another account it will indicate to the user that and not the username) -->

"STRETCH GOAL(if the user was prompted to login from a page that wasnt the actual login link, they will be redirected back to the page they were originally on. )


5) Now that the user is logged in they can now check the traveled to box in the states they visit. They can also now leave comments in a comment box to reccomemd places or things to do etc.. whatever they want really. There will also be a link now that the user can access to go to their profile the "/user/:id" page.

6) On the user ID template there will be a information about the user and the states they have checked off while logged in. At this point if the user wants to log off they can simply click the log off link that will log them out and take the user back to the home page. 

7) In the case the user does not have a profile, they will be prompted to register. Registration will ask for an email adress, firstname, and lastname. After the user has been registered and confirmed solid, they will be routed to their id page. 

8) The user will be able to delete comments that they have made on the states id pages. 	they will also be able to edit or update only thier comments. 


WireFrames

https://github.com/statesapp/proposal/issues/1


User Schema

name : {
	type : string,
	required: true
},
capital: {
	type: String,
	req: true, 
},
population: {
	type: Number
	required: 
},
topAttractions: [STRING],
stateBird: String, 


User Schema

username: {
	type: String,
	required: True, 
},
password: {
	type: String, 
	required: True, 
},
emailAdress: {
	type: String, 
	required: True  
} 
firstname: String, 
lastname: String,
dateOfBirth: Date,
