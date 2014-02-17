(function () {
  var width = 369
    , height = 150
    , twoPi = 2 * Math.PI
    , $date = $('.js-date')
    , endDate = new Date($date.val())
    , startDate = new Date($date.data('start-date')).getTime()
    , timerId

  if (!endDate) return

  var arcBackground = d3.svg.arc().startAngle(0).innerRadius(55).outerRadius(70)
    , arcForeground = d3.svg.arc().startAngle(0).innerRadius(50).outerRadius(72)
    , svg = d3.select('.js-donut-graph').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(80,' + height / 2 + ')')

  var meter = svg.append('g').attr('class', 'progress-meter')
  meter.append('path').attr('class', 'background').attr('d', arcBackground.endAngle(twoPi))

  var $progress = meter.append('path').attr('class', 'foreground')
    , $days = meter.append('text').text(' Days').attr('transform', 'translate(120,-30)')
    , $hours = meter.append('text').text(' Hours').attr('transform', 'translate(120,10)')
    , $minutes = meter.append('text').text(' Minutes').attr('transform', 'translate(120,50)')

  timerId = setInterval(function() {
    var now = new Date()
      , difference = endDate - now
      , seconds = Math.floor((difference) / 1000)
      , minutes = Math.floor(seconds / 60)
      , hours = Math.floor(minutes / 60)
      , days = Math.floor(hours / 24)

    hours = hours - (days * 24)
    minutes = minutes-(days * 24 * 60) - (hours * 60)
    seconds = seconds-(days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId)
      var $eventName = $('.module module--date-countdown h1')
      $eventName.text($eventName.text() + ' has begun!')

      return
    }

    var minutesText = minutes + ' Minute'
      , hoursText = hours + ' Hour'
      , daysText = days + ' Day'

    if (minutes !== 1) minutesText += 's'
    if (hours !== 1) hoursText += 's'
    if (days !== 1) daysText += 's'

    $minutes.text(minutesText)
    $hours.text(hoursText)
    $days.text(daysText)

    var percent = difference / (endDate - startDate )
      , radianAngle = twoPi - (twoPi * percent)

    $progress.attr('d', arcForeground.endAngle(radianAngle))
  }, 1000)

})()
