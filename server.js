const express = require('express');
var fs = require("fs");
const hbs = require('hbs');

var app = express();

// -----------------------------------------------------------------------------------------------------------------------------------------
                            //hbs
                            hbs.registerPartials(__dirname + '/views/partials')
                            app.set('view engine', 'hbs');

                            // app.use(express.static(__dirname + '/public'));

                                                                      //MIDDLEWARE -- GIVE USERS LOG INFO
                                                                      app.use((req, res, next) => {
                                                                        var now = new Date().toString();
                                                                        var log = `${now} : ${req.method} ${req.url}`
                                                                        console.log(log);
                                                                        fs.appendFile('server.log', log + '\n', (err) => {
                                                                          console.log("Unable to log data..!!");
                                                                        });
                                                                        next();
                                                                      });

                                                                      // UNCOMMENT BELOW CODE WHEN WEBSITE IS DOWN 
                                                                      // app.use((req, res, next) => {
                                                                      //   res.render('maintain.hbs');
                                                                      // });
                                                                      app.use(express.static(__dirname + '/public'));


                            hbs.registerHelper('getCurrentYear', () => {
                              return new Date().getFullYear()
                            });

                            hbs.registerHelper('screamIt', (text) => {
                              return text.toUpperCase();
                            });



// -------------------------------------------------------------------------------------------------------------------------------------------
      //Routes
      app.get('/', (req, res) => {
        res.render('home.hbs', {
          pageTitle: 'Home Page',
          welcomeMessage: 'Welcome to my website'
        });
      });

      app.get('/about', (req, res) => {
        res.render('about.hbs', {
          pageTitle: 'About Page'
        });
      });

                // /bad - send back json with errorMessage
      app.get('/bad', (req, res) => {
        res.send({
          errorMessage: 'Unable to handle request'
        });
      });


                                    //listen
                                    app.listen(3000, () => {
                                      console.log('Server is up on port 3000');
                                    });
