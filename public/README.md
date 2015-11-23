# Firefly
### Frontend Code
***

	Devin Nguyen, Keaton Brandt, Osvaldo Rosado, Jonathan Goodnow

Firefly is a multifaceted project, with different user roles and different states. As such, it has four different frontend interfaces, each of which is an
independant web application. Of course, each interface has many things in common, and as such they share a great deal of code between them. This is enabled
by the modular Javascript library *Angular.js* and by the extensibility of *SCSS* stylesheets.

## Basic Code Structure

The frontend code is 'interleaved' to encourage sharing. In other words, code is broken up by its language and purpose, not by its target app.

* **css:** Compiled CSS files. *See ./scss for the original code*
* **directives:** Angular.js directives, which are HTML components designed to be re-used. *See Directives section*
* **images:** Image assets used by the frontends. Contains SVGs and PNGs
	* **dummy:** Used in test code such as the component playground
* **js:** Contains both Typescript files (confusing, we know), and the compiled Javascript they create.
	* **audience:** Scripts for the currently unused class selector view
	* **component-playground:** Angular.js app that tests directives like `<ff-content-box>` in a controlled environment
	* **presentation:** Angular.js app for the presentation view, used as an iFrame in other apps
	* **presenter:** Angular.js app for the presenter view
	* **shared:** Simple code used by multiple frontends
		* *api.ts:* Object Oriented Firefly API wrappers
		* *config.ts:* Stores connection information
		* *localWindow.ts:* Helper functions for communicating with iFrames
	* **typings:** Used by Typescript to validate calls to external libraries (jQuery and Angular)
	* **uploader:** Scripts for the PPTX uploader
	* **viewer:** Angular.js app used to follow along with presentations and submit content
* **sass:**
	* *_colors.scss:* All colors used by Firefly, as defined in the design doc
	* *style.scss:* Basic styles shared between all frontends (things like typography)
	* **All other files:** Styles for a specific frontend
* **templates/viewer:** HTML templates used by Angular's ngRouter that define pages of the viewer app
* **HTML Files:** Markup for their respective frontends


## Angular Directives

An Angular directive is an independent module that can be used in HTML and defines a page element with its own content and functionality.
For example, a popup directive could be embedded in HTML files by adding a simple `<popup>` tag, and would take care of displaying whatever
is inside it in an overlay. Angular comes with many built in directives that are used liberally throughout the apps. Firefly adds 6 directives,
each of which is used by at least one frontend.

### collapse

Container element that can expand or collapse in an animated manner. Used by `<ff-content-box>` to show the preview and action buttons.

* **expanded:** *boolean* When true, the content is displayed. Changing this triggers an animation.
* **duration:** *number* How long the animation takes.


### ff-content

Displays an FFGenericContent object. For Youtube videos it will create an embed code.

* **content:** *FFGenericContent* The content object to render (obviously).
* **thumbnail:** *boolean* For youtube videos, displays the thumbnail instead of an embed. Used by `<ff-content-box>`.


### ff-question

Used by `<ff-content>` to display Question content. Includes special styles to render a question box in pure CSS.

* **content:** *FFQuestionContent* The question object to render.
* **isReply:** *boolean* Replies are rendered a little differently from top level questions.


### ff-content-box

Wraps `<ff-content>` to add an expandable preview and action buttons. Calls API methods for Upvote and Flag.

* **content:** *FFGenericContent* Forwarded to the internal `<ff-content>` directive.
* **showThumbnai:** *boolean* Determines whether to display a thumbnail beside the content name.
* **expanded:** *boolean* Determines whether to show the content preview and action bar
* **isForm:** *boolean* When true, adds a reply form to questions.
* **replyValid:** *boolean* Validation for the question reply form.


### floating-content

Used to allow vertical centering of arbitrary height content, which is difficult or impossible in pure CSS. Also enables content
to be scaled in order to fit its boundaries.

* **floatX:** *number [0..1]* Decimal value determining how to position the content horizontally. 0.5 = centered.
* **floatY:** *number [0..1]* Decimal value determining how to position the content vertically. 0.5 = centered.
* **contentWidth:** *number* Native width of the content
* **contentHeight:** *number* Native height of the content
* **size:** *number* When defined, determines how close the content comes to filling its bounds. 1 = cover.


### frame-load

Very simple attribute directive that lets Angular know when an iFrame's SRC location has changed. Used for the login system.


## Specific Frontends

### Homepage (index.html and upload.html)
The homepage interface serves two purposes: It must introduce users to firefly, and it must allow presenters to start new presentations.
The landing page (available at onfirefly.ws) has a short description of the project, accompanied by helpful icons, along with a button
to start the presentation upload flow. The uploader is a simple jQuery-based Javascript app that accepts files and sends them to the
PPTX conversion server.

### Presenter View (presenter.html)
This Angular.js app is in some ways the core of Firefly. It allows the presenter to control the slideshow while also reviewing content
submitted by the audience. The presenter can choose to display submitted content on the screen at any time. The presenter view contains a
presentation view embedded with an iFrame, and uses the same `<ff-content-box>` directive as the audience view, both of which ensure
consistency between the different interfaces.

### Viewer (viewer.html and ./templates/viewer/*.html)
The audience uses this mobile-first Angular.js app to follow along with the presentation in real time and submit content and questions.
This app is the only one that has multiple pages, and as such is the only one to have page templates aside from its main HTML file. Angular's
ngRoute module is used to handle page routing in such a way that the forward and back buttons in the browser work as expected. To keep things
simple, live content is loaded using frequent HTTP polling instead of WebSockets.

### Presentation View (presentation.html)
The presentation view is its own Angular.js app, but it is designed to be a child of a host app, such as the presenter view or the audience view.
This view takes commands over `window.postMessage`, allowing it to be embedded in an iFrame or a popup. It is responsible for displaying slides,
content overlays, and questions. To make things more interesting, it adds complex CSS3 animations to the mix. It is also capable of displaying
a footer with the audience view link and the firefly logo, which is visible on the projection screen.

### Component Playground (component-playground.html)
During development, it was difficult to test new directives without interfering with the work being done on the user-facing frontends. The component
playground was created to solve this problem. It is a very simple Angular app that contains the `<ff-content-box>` directive in various states.
It may also come in handy for manual user testing.