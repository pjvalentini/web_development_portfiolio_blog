# web_development_portfiolio_blog

This is my designer/web development website.

I have recently upgraded it with a blog built in node using express and setting
it up with an MVC architecture, and using ejs templates.

Instructions on how to run:

  - The site currently runs on localhost:3000 (will be posting to heroku)
  - You can run the site by typing - nodemon index.js - in the terminal
  - Navigate through the site as you wish, you can click on the blog button in the nav background
    when you get to the blog home you can check out the articles or even post one yourself.

  - Posting Articles: You have the option to create your article with a form that will guide you to
    choose a title, upload an image and type your article as well.

This website was built with HTML, CSS, and JavaScript on the fromt end. Node and Express on the back end.

Dependencies :
"body-parser": "^1.18.2",
"ejs": "^2.5.7",
"express": "^4.16.2",
"express-validator": "^4.3.0",
"jsonfile": "^4.0.0",
"pug": "^2.0.0-rc.4",
"util": "^0.10.3"

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
      get it ready to be read and then the data can be extracted from it and setup to
      create the 3 views for the blog pages.

  - The Views:
    - there are 6 views with the 404.ejs as the most recent to be added. This template
      is linked to the controller articles.js file. and provides and error page/message
      in case if an issue.

  - Globals take care or any repeating code in the header and footer of the index,
    about, contact and 404 ejs templates.

  - Partials take care of any repeating code in the article-item.ejs,
    and form-comments ejs templates.

This is a continuing work in progress...
