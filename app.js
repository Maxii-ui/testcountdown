
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', function (req, res) {
  var events = JSON.parse(process.env.EVENTS)
    , lastEventDate = new Date()
    , newEventDate = new Date()
    , nextEvent = false

  events.forEach(function (event) {
    var eventDate = new Date(event.date)

    if (eventDate < lastEventDate) lastEventDate = eventDate

    if (eventDate > newEventDate) {
      nextEvent = event
    }
  })

  // Default to Christmas
  if (!nextEvent) {
    var christmasDate = new Date()
    christmasDate.setMonth(11, 25)

    nextEvent = { name: 'Christmas', date: christmasDate.toString() }
  }

  res.render('index', { nextEvent: nextEvent, lastEventDate: lastEventDate.toString() })
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
