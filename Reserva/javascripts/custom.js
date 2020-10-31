$(document).ready(function() {

  //Test Support for HTML5 Features
  if (localStorage)  
    console.log("∝ Local Storage: OK");  
  else  
    console.log("∝ Local Storage: Unsupported");

  if (navigator.geolocation)  
    console.log("∝ Geo Location: OK");  
  else  
    console.log("∝ Geo Location: Unsupported");




	//filtering for Notifications View
	$('fieldset#noticeViewer button').click(function() {
		$('fieldset#noticeViewer .active').removeClass('active');
		$(this).addClass('active');

		var filterVal = $(this).text().toLowerCase().replace(' ','-');
		console.info('⋇ filter NOTIFICATIONS by ' + filterVal);

		if(filterVal == 'all') {
			$('article#notificationsView div.message.hidden').show().removeClass('hidden');
		} else {
			$('article#notificationsView div.message').each(function() {
				if(!$(this).hasClass(filterVal)) {
					$(this).hide().addClass('hidden');
				} else {
					$(this).show().removeClass('hidden');
				}
			});
		}

		return false;
	});

	//filtering for Reservations View
	$('fieldset#reservationsViewer button').click(function() {
		$('fieldset#reservationsViewer .active').removeClass('active');
		$(this).addClass('active');

		var filterVal = $(this).text().toLowerCase().replace(' ','-');
		console.log('⋇ filter RESERVATIONS by ' + filterVal);

		if(filterVal == 'all') {
			$('article#reservationsView aside.upcomingFlight.hidden').show().removeClass('hidden');
		} else {
			$('article#reservationsView aside.upcomingFlight').each(function() {
				if(!$(this).hasClass(filterVal)) {
					$(this).hide().addClass('hidden');
				} else {
					$(this).show().removeClass('hidden');
				}
			});
		}

		return false;
	});

	//Make Reservation Radio box selection for Aircraft type reservation
	$("#calendarViewer input[type=radio]").click(function(){
		if ($(this).val()==="Airplane"){
			$("#cal-helicopters").hide();
			$("#heliNavMenu").hide();
			$("#cal-airplanes").show();
			$("#airNavMenu").show();
			console.log('⋇ filter CALENDAR by Airplanes');
		} else {
			$("#cal-airplanes").hide();
			$("#airNavMenu").hide();
			$("#cal-helicopters").show();
			$("#heliNavMenu").show();
			console.log('⋇ filter CALENDAR by Helicopters');
		}
	});

	//side navigation links
	$('#sidebar_nav_options .list a').click(function() {
		$('#sidebar_nav_options .list.active').removeClass('active');
		$(this).parent().addClass('active');

		var filterVal = $(this).children("b").text();
		console.log('↳ SIDEBAR ' + filterVal);

		return true;
	});

	//Notifications View message close button
	$('.message-close').click(function() {
		$(this).parent().remove();
		console.log('⚪ NOTIFICATIONS deleted');
		return false;
	});


	//Modal Confirmation for each reservation
	$("ol.hours").delegate("li[class!='unavailable'][class!='reserved']", "click", function(){
		emTime = $(this).html();
		emDay = $(this).parent().parent().find("label.flightDay").html();
		emDayName = $(this).parent().parent().find("label.flightDayName").html();
		$('#confirmModal .flightDay').html(emDay);
		$('#confirmModal .flightDayName').html(emDayName);
		$('#confirmModal .flightTime').html(emTime);
		$('#confirmModal').addClass('show');
		console.log("◼ CONFIRMATION WINDOW opened");
	});

	// cancel buttons under reservations and dashboard
	$(".upcomingFlight").delegate(".button-cancel", "click", function(){
		$('#cancelModal').addClass('show');
		console.log("◼ CANCELATION WINDOW opened");
	});

	// live cancel button for modal screens
	$('body').delegate(".closeModal", "click", function(){
		$('.modal').removeClass('show');
		console.log("◻ WINDOW closed");
		return false;
	});

	//Add Json serialization support for form submitions
	$.fn.serializeObject = function()
	{
		 var o = {};
		 var a = this.serializeArray();
		 $.each(a, function() {
		     if (o[this.name] !== undefined) {
		         if (!o[this.name].push) {
		             o[this.name] = [o[this.name]];
		         }
		         o[this.name].push(this.value || '');
		     } else {
		         o[this.name] = this.value || '';
		     }
		 });
		 return o;
	};

	//Profile view form has been submited
	$('form#form_profileView').submit(function() {
		//console.log($(this).serializeArray());
		//alert($(this).serialize());
		//alert($(this).serializeArray());
		//console.log(" PROFILE* submited form data: " + $(this).serialize());
		alert("Submited! Check console!");
		console.warn("↷ PROFILE submit form: " + JSON.stringify($(this).serializeObject()));
		//$("#profileView_footer nav.center").append('<div class="message success">Updated!</div>').delay(2000).fadeOut('slow');
	  return false;
	});

	//Confirm Modal view form has been submited
	$('form#form_confirmModal').submit(function() {
		alert("Reserved! Check console!");
		console.warn("↻ RESERVED flight data: " + $(this).serialize());
	  return false;
	});

	//Cancel Modal view form has been submited
	$('form#form_cancelModal').submit(function() {
		alert("Canceled! Check console!");
		console.warn("↺ CANCELED flight data: " + $(this).serialize());
	  return false;
	});

});

//Report to Concole 
console.warn('↪ loaded Site Functionality');
