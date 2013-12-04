(function () {
  var date = document.getElementById('date').value
    , countdown = document.getElementById('countdown')

  window.countdown(new Date(date), function (ts) {
    countdown.innerHTML = ts.toHTML('strong')
  })

})()
