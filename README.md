## WhoHasMyTools
Allows Users to sign up, add Tools, and loan those tools to other Users.

I was inspired to create this little tool-tracker because I borrow a lot of tools, and I loan out a of tools. It's a good thing because it means I must have a lot of friends who make stuff, but sometimes I need something and I forget who has it -- especially if it's a tool I don't use very often, I have loaned it out months ago and have no recollection of the event. 

Thus, Who Has My Tools?  was born.

### What you should know
The User to User relationship is defined as loaner to borrower, and created with a 
`has_many through: loaner_contracts and borrower_contracts association`. See the `User` and `Contract` models for details.

### Getting familiar
* Run `db:migrate` and `db:seed` to create two Users and one Tool. 
* Check the seed file for username/pass and log in as "bob".  
* Loan the drill to "jim"
* Click on stuff and play around (add some tools to the toolbox, return the tool, etc.)
* Log in as "jim" to view things from the "borrower" perspective

### Future development
- A future version could also put in timed reminders, and send a message to both parties at some determined interval (1 week, 2 weeks) to remind them who has their Tools, whose Tools they have.

- The My Tools section of the User dashboard could be altered to display Available Tools vs Loaned Tools (right now all Tools are displayed, regardless of loan status). This would be useful as a quick overview of the state of one's tool library. 

- "Due date" functionality should be added.. when is this tool due back? And then an option to "extend due date" if borrower wants to hang on to it
