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


### Notes
* `Eminem` has been set as default artist.
* Artist can be changed using search. Artist do not contain proper images because of api limitations.
* Added songs and artist search.
* Limited albums that only has unique id. 
* Some of the albums can be empty because even we have the unique id request is getting `Not Found` from the api.        
* Favourites are managed using `redux`.
* Favourites data are being persisted using `redux-persist`.
* For data fetching, caching, synchronizing used `react-query`.
* Added 200 page limit when calling albums api because for some artists album pages are shown more than 2000 pages.
* Added custom hooks to separate logics from the UI.
* Added `load more` instead of `pagination` because in some pages lower than the limit from api. Sometimes some pages has no data with the unique id.
* Add unit testing for utility functions.
* When searching songs response is without the song `duration`, because of that in `Liked songs` page favourite will show without duration. 

### Todo
* Need to include album type in search component.
* Add more content and improve UI on `Liked Songs` page.
* Add collapsible navbar for mobile view.
* Add scroll to top button.
* Add some testing using `react-testing-library`.
* Change themes, translations - i18n.
* Create head component to add meta data
