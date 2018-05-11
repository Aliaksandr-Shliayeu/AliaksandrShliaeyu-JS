var datepeaker = {
  month: document.querySelectorAll('[data-calendar-area="month"]')[0],
  next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
  previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
  label: document.querySelectorAll('[data-calendar-label="month"]')[0],
  activeDates: null,
  date: new Date(),
  todaysDate: new Date(),
  
  
  init: function (options) {
    this.options = options
    this.date.setDate(1)
    this.createMonth()
    this.createListeners()
  },


  createListeners: function () {
    var next = document.querySelectorAll('[data-calendar-toggle="next"]')[0]
    var previous = document.querySelectorAll('[data-calendar-toggle="previous"]')[0]
    var _this = this
    next.addEventListener('click', function () {
      _this.clearCalendar()
      var nextMonth = _this.date.getMonth() + 1
      _this.date.setMonth(nextMonth)
      _this.createMonth()
    })
    // Clears the calendar and shows the previous month
    previous.addEventListener('click', function () {
      _this.clearCalendar()
      var prevMonth = _this.date.getMonth() - 1
      _this.date.setMonth(prevMonth)
      _this.createMonth()
    })
  },


  createDay: function (num, day, year) {
    var month = document.querySelectorAll('[data-calendar-area="month"]')[0]
    var newDay = document.createElement('div')
    var dateEl = document.createElement('span')
    dateEl.innerHTML = num
    newDay.className = 'sh-datepeaker-date'
    newDay.setAttribute('data-calendar-date', this.date)
    newDay.classList.add('sh-datepeaker-date--active')
    newDay.setAttribute('data-calendar-status', 'active')
    
    // if it's the first day of the month
    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = (6 * 14.28) + '%'
      } else {
        newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
      }
    }
    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('sh-datepeaker-date--today')
    }
    
    newDay.appendChild(dateEl)
    month.appendChild(newDay)
  },

  dateClicked: function () {
    var _this = this
    this.activeDates = document.querySelectorAll(
      '[data-calendar-status="active"]'
    )
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].addEventListener('click', function (event) {
        var picked = document.querySelectorAll(
          '[data-calendar-label="picked"]'
        )[0]
        _this.removeActiveClass()
        this.classList.add('sh-datepeaker-date--selected')
      })
    }
  },

  createMonth: function () {
    var currentMonth = this.date.getMonth()
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear()
      )
      this.date.setDate(this.date.getDate() + 1)
    }
    // while loop trips over and day is at 30/31, bring it back
    this.date.setDate(1)
    this.date.setMonth(this.date.getMonth() - 1)

    var label = document.querySelectorAll('[data-calendar-label="month"]')[0]
    label.innerHTML =
      this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
    this.dateClicked()
  },

  monthsAsString: function (monthIndex) {
    return [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ][monthIndex]
  },

  clearCalendar: function () {
    var month = document.querySelectorAll('[data-calendar-area="month"]')[0]
    month.innerHTML = ''
  },

  removeActiveClass: function () {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove('sh-datepeaker-date--selected')
    }
  }
}