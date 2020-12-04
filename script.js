'use strict';

//Public Globals
const days = ['일', '월', '화', '수', '목', '금', '토'];
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

let c_date = new Date();
let day = c_date.getDay();
let month = c_date.getMonth();
let year = c_date.getFullYear();

(function App() {

    const calendar = `
        <div id="calendar-page">
            <div class="row">
                <div class="col-sm-6 col-12 d-flex">
                    <div class="card border-0 mt-5 flex-fill">
                        <div class="card-header py-3 d-flex justify-content-between">
                            <span class="prevMonth">◀</span>
                            <span><strong id="s_m"></strong></span>
                            <span class="nextMonth">▶</span>
                        </div>
                        <div class="card-body px-1 py-3">
                            <div class="table-responsive">
                                <table class="table table-sm table-borderless">
                                    <thead class="days text-center">
                                        <tr>
                                            ${Object.keys(days).map(key => (
                                                `<th><span>${days[key].substring(0,3)}</span></th>`
                                            )).join('')}                                            
                                        </tr>
                                    </thead>
                                    <tbody id="dates" class="dates text-center"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-12 d-flex pa-sm">
                    <div class="card border-0 mt-5 flex-fill d-none" id="event">
                        <div class="card-header py-3 text-center">
                            <!--<button type="button" class="close hide">
                                <span aria-hidden="true">&times;</span>
                            </button>-->
                        </div>
                        <div class="card-body px-1 py-3">
                            <div class="text-center target-date">
                                <span class="event-day">월</span><br>
                                <span class="event-date">06</span><br>
                            </div> 
                            <div class="events-today my-3 px-3">
                               
                            </div>
                            <img src="img/icon/icon_add.png" style="width:10vw;" onclick="add_event_page()">
        
                        </div>
                    </div>                            
                </div>
            </div>
            <div aria-live="polite" aria-atomic="true" style="position: relative;">
                <div class="toast" style="position: absolute; top: 0; right: 15px;" data-delay="3000">
                    <div class="toast-header">
                    <strong class="mr-auto">Calendar</strong>
                    <small>Just now</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="toast-body">
                    
                    </div>
                </div>
            </div>
        
            <footer class="footer">
                <img src='img/icon/icon_menu_diary_sel.png' onclick="location.href='diary.html'" class="icon">
                <img src='img/icon/icon_menu_tag.png' onclick="location.href='keep.html'" class="icon">
                <img src='img/icon/icon_menu_main.png' onclick="location.href='home.html'" class="icon">
                <img src='img/icon/icon_menu_meditate.png' onclick="location.href='meditation.html'" class="icon">
                <img src='img/icon/icon_menu_setting.png' onclick="location.href=''" class="icon">
            </footer>
        </div>

        <div id="add-event-page">
            <h1 onclick="location.href='calendar.html'" style="color:white; position: absolute; font-size:4vw; top:0; margin-top:8%;">X</h1>
            <div class="input-group-append" style="position:absolute; top:0; margin-top:8%; right:10%;">
                <h2 id="createEvent" style="font-size:4vw;">완료</h2>
            </div>
            <div class="input-group events-input mb-3 col-10 mx-auto mt-2">
                <input type="text" class="form-control" placeholder="디데이 이름을 작성해주세요." id="eventTxt" style="color:white;">
            </div>
        </div>

        `
        ;
    document.getElementById('app').innerHTML = calendar;   
})()

/* js로 달력 그리기 */
function renderCalendar(m, y) {
    //Month's first weekday
    let firstDay = new Date(y, m, 1).getDay();  
    //Days in Month
    let d_m = new Date(y, m+1, 0).getDate();
    //Days in Previous Month
    let d_pm = new Date(y, m, 0).getDate();
    
    
    let table = document.getElementById('dates');
    table.innerHTML = '';
    let s_m = document.getElementById('s_m');
    s_m.innerHTML = months[m] + '<br><span id="cal-year">' + y; +'</span>'
    let date = 1;
    //remaing dates of last month
    let r_pm = (d_pm-firstDay) +1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {  
                let cell = document.createElement('td');
                let span = document.createElement('span');
                let cellText = document.createTextNode(r_pm);
                span.classList.add('ntMonth');
                span.classList.add('prevMonth');                  
                cell.appendChild(span).appendChild(cellText);
                row.appendChild(cell);
                r_pm++;
            }
            else if (date > d_m && j <7) {
                if (j!==0) {
                    let i = 0; 
                    for (let k = j; k < 7; k++) {
                         i++                                             
                        let cell = document.createElement('td');
                        let span = document.createElement('span');
                        let cellText = document.createTextNode(i);
                        span.classList.add('ntMonth');                    
                        span.classList.add('nextMonth');                    
                        cell.appendChild(span).appendChild(cellText);
                        row.appendChild(cell);          
                    };                  
                }                
               break;
            }
            else {
                let cell = document.createElement('td');
                let span = document.createElement('span');
                let cellText = document.createTextNode(date);
                span.classList.add('showEvent');
                if (date === c_date.getDate() && y === c_date.getFullYear() && m === c_date.getMonth()) {
                    span.classList.add('today-active');

                } 
                cell.appendChild(span).appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        table.appendChild(row);
    }
}

function add_event_page() {
    document.getElementById("calendar-page").style.display = "none";
    document.getElementById("add-event-page").style.display = "block";
}

/* 달력 인터렉션 */
renderCalendar(month, year)

    $(function(){
        function showEvent(eventDate){
            let storedEvents = JSON.parse(localStorage.getItem('events'));
            if (storedEvents == null){
                $('.events-today').html('<a class="text-center" style="color: #999999;">등록된 디데이가 없습니다.</a class="text-center">');
            }else{
                let eventsToday = storedEvents.filter(eventsToday => eventsToday.eventDate === eventDate);
                let eventsList = Object.keys(eventsToday).map(k => eventsToday[k]);
                if(eventsList.length>0){
                    let eventsLi ='';
                    eventsList.forEach(event =>  $('.events-today').html(eventsLi +=`<div class="events_list" role="alert">●　
                    ${event.eventText}
                  </div>`));
                }else{
                    $('.events-today').html('<a class="text-center" style="color: #999999;">등록된 디데이가 없습니다.</a class="text-center">');
                }               
            }
        }
        function removeEvent(id){
            let storedEvents = JSON.parse(localStorage.getItem('events'));
            if(storedEvents != null){
                storedEvents = storedEvents.filter( ev => ev.id != id ); 
                localStorage.setItem('events', JSON.stringify(storedEvents));
                $('.toast-body').html('Your event have been removed');
                $('.toast').toast('show');
            }
        }
        $(document).on('click', '.remove-event', function(){
            let eventId = $(this).data('event-id');
            removeEvent(eventId);
        })

        $(document).on('click', '.prevMonth', function(){
            year = (month === 0) ? year - 1 : year;
            month = (month === 0) ? 11 : month - 1;
            renderCalendar(month, year);
        })
        $(document).on('click', '.nextMonth', function(){
            year = (month === 11) ? year + 1 : year;
            month = (month + 1) % 12;
            renderCalendar(month, year);
        })
    
        $(document).on('click', '.showEvent', function(){
            $('.showEvent').removeClass('active');
            $('#event').removeClass('d-none');
            $(this).addClass('active');
            let todaysDate = $(this).text() /* +' '+ (months[month]) +' '+ year*/;
            let eventDay = days[new Date(year, month, $(this).text()).getDay()];
            let eventDate = $(this).text() + month + year;
            $('.event-date').html(todaysDate).data('eventdate', eventDate);
            $('.event-day').html(eventDay);
            showEvent(eventDate);
        })
        $(document).on('click', '.hide', function(){
            $('#event').addClass('d-none');
        })



        /* 이벤트 추가 */
        $(document).on('click', '#createEvent', function(){
            let events = localStorage.getItem('events');
            let obj = [];
            if (events) {
                obj = JSON.parse(events);
            }
            let eventDate = $('.event-date').data('eventdate');
            let eventText = $('#eventTxt').val();
            let valid = false;
            $('#eventTxt').removeClass('data-invalid');
            $('.error').remove();
            if (eventText == ''){
                $('.events-input').append(`<br><a class="error">일정을 입력하세요.</a>`);
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');
            }else if(eventText.length < 3){
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');
                $('.events-input').append(`<br><span class="error">please enter at least three characters</span>`);
            }else{
                valid = true;
            }
            if (valid){
                let id =1;
                if (obj.length > 0) {
                    id = Math.max.apply('', obj.map(function (entry) { return parseFloat(entry.id); })) + 1;
                }
                else {
                    id = 1;
                }
                obj.push({
                    'id' : id,
                    'eventDate': eventDate,
                    'eventText': eventText
                });           
                localStorage.setItem('events', JSON.stringify(obj));
                $('#eventTxt').val('');
                $('.toast-body').html('Your event have been added');
                $('.toast').toast('show');
                showEvent(eventDate);
            }

            document.getElementById("calendar-page").style.display = "block";
            document.getElementById("add-event-page").style.display = "none";
        })
    })

            
