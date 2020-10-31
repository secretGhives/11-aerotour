//Sets the value for all magnetic variation text fields
function magVarChange(parentElement) {
	$(".magVar").each(function(index, element){
		element.value = parentElement.val();
	});
}


//Calculates Fuel Required.
function calculateFuelBurn() {
   var calculatedFuelSum = 14;
   var objRegExp = '\s+';
   $(".fuelSum").each ( function() {
        calculatedFuelSum += parseFloat ( $(this).val().replace(/\s/g,'').replace(',','.'));
   });
   calculatedFuel = Math.round(calculatedFuelSum * parseFloat($("#fuelcons").val()) / 60);
   $("#totalFuel").val(calculatedFuel + " gal");
   $("#txtFuel").val(calculatedFuel + " gal");
}

/**
 * Using wind direction and velocity calculate ground speed, time, fuel, magnetic heading
 */
function calcWindDirVelocity(element, index) {
    var dirVelocity = FlightCalculator.parseWinDirVelocity(element.val());
    var trueAS = $("#tas").val();
    var trueTrack = $("#trueTrack-" + index).val();
    var totAvgSpeed = 0;
    var totTime = 0;

    FlightCalculator.GndSpdCrsWca(dirVelocity[0], dirVelocity[1], trueTrack, trueAS);

    if ( index == 0 ) {
        var totalItems = $(".windVel").length;
        var windVels = $(".windVel");
        var headings = $(".heading");
        var gsKnots = $(".gsKnots");
        var drifts = $(".drift");

        for (var j = 0; j < totalItems; j++) {
            var $windVel = $(windVels[j]);
            var $heading = $(headings[j]);
            var $gsKnot = $(gsKnots[j]);
            var $drift = $(drifts[j]);

            FlightCalculator.GndSpdCrsWca(dirVelocity[0], dirVelocity[1], $("#trueTrack-" + j).val(), trueAS);
            var time = FlightCalculator.getTime($("#distance-" + j).text(), FlightCalculator.groundSpd);

            $windVel.val(element.val());
            $heading.val(FlightCalculator.magHeading);
            $gsKnot.val(FlightCalculator.groundSpd);
            $("#totTime-" + j).val(time);
            $drift.val(FlightCalculator.windCA);
        }
    } else {
        // calculate for a sigle row
        dirVelocity = FlightCalculator.parseWinDirVelocity(element.val());
        FlightCalculator.GndSpdCrsWca(dirVelocity[0], dirVelocity[1], $("#trueTrack-" + index).val(), trueAS);
        $("#heading-" + index).val(FlightCalculator.magHeading);
        $("#drift-" + index).val(FlightCalculator.windCA);
        $("#avgSpeed-" + index).val(FlightCalculator.groundSpd);
        var time = FlightCalculator.getTime($("#distance-" + index).text(), $("#avgSpeed-" + index).val());
        $("#totTime-" + index).val(time);
    }

    //avg distance
    $(".gsKnots").each(function(i, e) {totAvgSpeed = totAvgSpeed + parseInt($(e).val())});
    $("#averageSpeed").val(Math.ceil(totAvgSpeed / $(".gsKnots").length));
    // total time
    $(".totTime").each(function(i, e) {totTime = totTime + parseInt($(e).val())});
    $("#totalTime").val(totTime);
    $("#enroute").val(totTime);
    //fuel
    calculateFuelBurn();
    //set ETA
    startclock();
}

//Calculate ETA from current time for each row
// current time + minutes from Time Min
function startclock()
{
     var  dia = new Date(); 
     var  hora = dia.getHours(); 
     var  minutos = dia.getMinutes(); 
     var  segundos = dia.getSeconds();

     if ((hora >= 0)&&(hora <= 9)){ 
      hora="0"+hora; 
     }

     if ((minutos >= 0)&&(minutos <= 9)){ 
      minutos="0"+minutos; 
     }

     if ((segundos >= 0)&&(segundos <= 9)){ 
      segundos="0"+segundos; 
     }
 
	thisTime =  " "  + hora + ":" + minutos + ":" + segundos;
	//numbers
	tSecs = segundos * 1;
	tMins = minutos * 1;
	tHrs = hora * 1;
	tTime = $('#totTime-0').val() * 1;
	deptTime = $('#departTime').val();
	advTime = tTime + tMins;

	var tempTime = new Array();
	tempTime = deptTime.split(':');
	hrNum = tempTime[0] * 1;
	mnNum = tempTime[1] * 1;

     //$('#eta-0').val(deptTime + ':' + advTime + ':' + tSecs);
} 
