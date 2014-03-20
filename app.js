var Widget = new require('hud-widget')
  , widget = new Widget()

widget.get('/', function (req, res) {
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
