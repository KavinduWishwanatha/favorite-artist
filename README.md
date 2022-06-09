Favourite Artist
================

## Available Scripts

In the project directory, to install packages use command:
### `npm install`
then to start the server use command:
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm test`

See the section about [running tests](https://jestjs.io/docs/getting-started) for more information.


### Built using:

* [last fm](https://www.last.fm/api) API

### Todo
* Need to include album type in search component.
* Add more content and improve UI on Liked Songs page.
* Add Collapsible Navbar for mobile view.
* Create graph for best played tracks on the album.

### Notes
* `Eminem` has been set as default artist.
* Artist can be changed using search. Artist do not contain proper images because of api limitations.
* Added songs and artist search together.
* Used a filter for albums because there was no unique id associated with some. 
* Some of the albums that contain the id cannot used for other api calls to get details. Seems like api returns not found for them.
* Favourites are managed using redux.
* For data synchronization used react-query.