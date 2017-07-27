 
var calInit = function (events) {
     $('#calendar').eCalendar({
		weekDays: ['الأحَد', 'الإثْنَين', 'الثَلاثاء', 'الأربَعاء', 'الخَميس', 'الجُمُعة', 'السَبْت'],
        months: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو ', 'يوليو ', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'فعاليات الجامعة',
        url: '',
        events:events
    });
}
