# web_development_portfiolio_blog

This is my designer/web development website.

I have recently upgraded it with a blog built in node using express and setting
it up with an MVC architecture, and using ejs templates.

Dependencies :

  "body-parser": "^1.17.2",
  "ejs": "^2.5.6",
  "express": "^4.15.3",
  "jsonfile": "^3.0.1"

This site now contains a model, view and controller.

  - Index.js:
    - Requires express, body-parser, various middleware, and the controller actions
      and sets the ejs engine.  Also accesses all public files (css, images and fonts).
      Lastly it contains all the routes.

  - The Controller:
    - requires the articles.json file (this file has all of the articles info.)
    - There are two function as well, get() and show(), which control the renders of the
      blog homepage and blog detail page. Error catches are also in the get() and show()
      functions as well.

  - The Model:
    - Uses the jsonfile npm package to do a few things to the articles.json file to
      get it ready to be read and then the data can be extracted from it an setup to
      create the view bloghome.ejs. and blogpost.ejs

  - The Views:
    - there are 6 views with the 404.ejs as the most recent to be added. This template
      is linked to the controller articles.js file. and provides and error page/message
      in case if an issue.

  - Globals take care or any repeating code in the header and footer of the index,
    about, contact and 404 ejs templates.

  - Partials take care of any repeating code in the blogheader, blogfooter, blognavbar,
    and form-comments ejs templates.
