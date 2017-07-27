var calInit = function (events) {
    $('#calendar').eCalendar({
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        textArrows: { previous: '<', next: '>' },
        eventTitle: 'IAU Events',
        url: '',
        events: events
    });
}