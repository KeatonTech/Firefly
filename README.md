# Firefly
### A new way to lecture
***

	Jonathan Goodnow, Osvaldo Rosado, Keaton Brandt, Devin Nguyen

Firefly aims to shift the paradigm of powerpoint slide decks towards a more interactive and engaging experience in the classroom.  To aid learning and create a more enriching learning environment, presentations should be two-way communications between the students and the professor.  Firefly will allow students to submit content or questions to the presenter to have displayed on screen, right from a mobile web application.


## Languages

All Firefly code is written in Typescript, a superset of Javascript that includes data types and some syntactic sugar. Typescript was chosen because it makes collaboration easier, supports C-style classes out of the box, and enables intelligent autocomplete in IDEs. Typescript code must be compiled to Javascript before it can be executed.

**Important Note:** All \*.js files are outputs of the Typescript compiler. Our actual source code is in \*.ts files.

Similarly, we use a variant of SASS (Syntactically Awesome StyleSheets) called SCSS for frontend page styling. SCSS allows constants like colors, typography and basic layout to be shared between the different frontends (consistent with the original design document). It also allows for nested styles, which cleans up the code by providing a logical hierarchy. Once again, SCSS files must be compiled to CSS for use in the browser.

Grunt is used for all code compilation (technically transcompilation). Each output JS or CSS file is an amalgamation of several input files, all of which are watched by the Grunt CLI to keep abreast of changes. Grunt also creates an Angular template cache to improve page load time.


## Code Structure

* **controllers:** Node classes to handle API calls. Each of these may perform an action such as interacting with the Mongo database.
	* *BaseController.ts:* All API controllers inherit from this one, which defines a basic data structure
	* *Controllers.ts:* Imports all controllers
	* **Other Files:** See each file for a description of what it does. It is often self-explanatory from the name.
* **models:** Node classes to represent and operate on different data types.
	* *BaseModel.ts:* All other data models inherit from this one
	* *Presentation.ts:* Uploads presentations to the conversion server and stores its output.
	* *PresentationContent.ts:* Represents content that has been submitted by the audience for a presentation.
	* *PresentationInstance.ts:* Represents a specific 'run' of an uploaded presentation.
	* *User.ts:* Represents a user who has been authenticated with CAS
* **public:** *SEE PUBLIC/README.MD*
* **shared:** Code used by both the server and the frontend code (this is the advantage of full-stack typescript)
	* *data-types.ts:* Defines structs used by both client and server code, ensuring they have the same data format.
* **tests:** Unit tests using the custom FlySwatter testing framework
	* **controllers:** Test cases for classes defined in /controllers
	* **models:** Test cases for classes defined in /controllers
	* *BaseTest.ts:* All tests inherit from this class
	* *Mocks.ts:* Overrides HTTP methods for easier testing
* **typings:** Data types defined for the sake of Typescript
* *app.js:* The starting point for the Node server, essentially just loads the Typescript environment
* *authentication.ts:* Interfaces with RPI's Common Authentication System to log users in
* *config.ts:* Defines properties for the function of the server
* *database.ts:* Connects to the Mongo database and provides helper functions for interacting with it
* *firefly.ts:* Sets up Express and starts the server
* *Gruntfile.js:* Configures the Grunt build system, used to compile frontend code
* *LICENSE:* MIT License
* *package.json:* Defines the NPM package, which allows web hosts to run the app in a standard way
* *test.js:* Similar to app.js but launches the FlySwatter testing system
* *tsd.json:* Configures the typescript compiler

Ignored folders such as node_modules can be created by following the instructions in ["Running Firefly on Your Own"](https://github.com/OsvaldoRosado/Firefly/wiki/Running-Firefly-on-Your-Own)