const timeBtn = $('#timeButton');
console.log(timeBtn);

const paceDistanceToMeters = (paceDistance, units) => {
	if (units == 'miles') {
		return paceDistance / 1609;
	} else {
		return paceDistance / 1000;
	}
};
const distanceToMeters = (distance, units) => {
	if (units == 'miles') {
		return distance * 1609;
	} else {
		return distance * 1000;
	}
};
const totalTime = (hour, min, sec) => {
	console.log(hour, min, sec);
	return parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(sec);
};

const backInTime = (totalSec) => {
	const hour = Math.floor(totalSec / 3600);
	const min = Math.floor((totalSec - hour * 3600) / 60);
	let sec = totalSec - hour * 3600 - min * 60;
	sec = Math.round(sec.toFixed(2));
	console.log(hour, min, sec);

	return [hour, min, sec];
};

const calculateTime = () => {
	const dUnits = $('#distanceUnits').val();
	const d = distanceToMeters($('#distance').val(), dUnits);
	const pHour = $('#paceHour').val() || 0;
	const pMin = $('#paceMin').val() || 0;
	const pSec = $('#paceSec').val() || 0;
	const pUnits = $('#paceDistance').val() || 0;
	const p = paceDistanceToMeters(totalTime(pHour, pMin, pSec), pUnits);
	const answer = backInTime(d * p);
	console.log(answer);
	// putting answer back into TIME Fields
	$('#timeHour').val(answer[0]);
	$('#timeMin').val(answer[1]);
	$('#timeSec').val(answer[2]);

	// console.log(d, units, pHour, pMin, pSec, pDist);
	// console.log(pHour, pMin, pSec);
	// console.log(totalTime(pHour, pMin, pSec));
	// console.log(backInTime(totalTime(pHour, pMin, pSec)));
};

timeBtn.on('click', calculateTime);
