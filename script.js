// FUNCTIONS

// this converts to secs per meter
const paceDistanceToMeters = (paceDistance, units) => {
	if (units == 'miles') {
		return paceDistance / 1609;
	} else if (units == 'kilometer') {
		return paceDistance / 1000;
	} else {
		return paceDistance / parseInt(units);
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
	// console.log(hour, min, sec);
	return parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(sec);
};

const backInTime = (totalSec) => {
	const hour = Math.floor(totalSec / 3600);
	const min = Math.floor((totalSec - hour * 3600) / 60);
	let sec = totalSec - hour * 3600 - min * 60;
	sec = sec.toFixed(2);
	console.log(hour, min, sec);

	return [hour, min, sec];
};

const backInUnits = (meters, units) => {
	if (units == 'miles') {
		return meters / 1609;
		// lots of else ifs for other distances like 100m, 200m, 400m, etc
	} else if (units == 'kilometer') {
		return meters / 1000;
	} else {
		return meters / parseInt(units);
	}
};

const calculateTime = () => {
	const dUnits = $('#distanceUnits').val();
	const d = distanceToMeters($('#distance').val(), dUnits);
	const pHour = $('#paceHour').val() || 0;
	const pMin = $('#paceMin').val() || 0;
	const pSec = $('#paceSec').val() || 0;
	const pUnits = $('#paceUnits').val() || 0;
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

const calculateDistance = () => {
	//grab pace
	const pHour = $('#paceHour').val() || 0;
	const pMin = $('#paceMin').val() || 0;
	const pSec = $('#paceSec').val() || 0;
	const pUnits = $('#paceUnits').val();
	const p = paceDistanceToMeters(totalTime(pHour, pMin, pSec), pUnits);
	// grab time
	const tHour = $('#timeHour').val() || 0;
	const tMin = $('#timeMin').val() || 0;
	const tSec = $('#timeSec').val() || 0;
	//grab units
	const dUnits = $('#distanceUnits').val();
	//do the Math
	const answer = backInUnits(totalTime(tHour, tMin, tSec) / p, dUnits);
	console.log(answer);
	$('#distance').val(answer.toFixed(2));
};

const calculatePace = () => {
	// grab time
	const tHour = $('#timeHour').val() || 0;
	const tMin = $('#timeMin').val() || 0;
	const tSec = $('#timeSec').val() || 0;
	//grab distance
	const dUnits = $('#distanceUnits').val();
	const d = distanceToMeters($('#distance').val(), dUnits);
	//grab the pace units
	const pUnits = $('#paceUnits').val();
	// do the maths
	const totalSeconds = totalTime(tHour, tMin, tSec);
	const answer = backInTime(totalSeconds / backInUnits(d, pUnits));
	//test console log answer
	console.log(answer);
	$('#paceHour').val(answer[0]);
	$('#paceMin').val(answer[1]);
	$('#paceSec').val(answer[2]);
	return { answer, d, dUnits, pUnits, totalSeconds };
};

const renderSplits = () => {
	$('#table-body').empty();
	const { answer, d, dUnits, pUnits, totalSeconds } = calculatePace();
	//return answer, d, dUnits, pUnits;
	console.log(answer, pUnits);
	// total distance divided by pUnits
	if (pUnits == 'miles' || pUnits == 'kilometer') {
		let numberOfSplits = d / distanceToMeters(1, pUnits);
		console.log(numberOfSplits);
		//create numberofSplits rows in a table
		for (let i = 0; i < Math.ceil(numberOfSplits); i++) {
			//create row #i
			const row = document.createElement('tr');
			const distanceCell = document.createElement('td');
			const splitCell = document.createElement('td');
			let splitTime;
			if (i != Math.ceil(numberOfSplits) - 1) {
				distanceCell.textContent = i + 1;
				splitTime = backInTime(totalTime(answer[0], answer[1], answer[2]) * (i + 1));
			} else {
				console.log(pUnits);
				distanceCell.textContent = backInUnits(d, pUnits).toFixed(2);
				splitTime = backInTime(totalSeconds);
			}
			splitCell.textContent = `${splitTime[0]}:${splitTime[1]}:${splitTime[2]}`;
			// console.log(splitCell.textContent);
			row.appendChild(distanceCell);
			row.appendChild(splitCell);
			$('#table-body').append(row);
		}
	}
};

const eventFill = () => {
	const value = $('#eventSelect').val().split('-');
	console.log(value);
	$('#distance').val(value[0]);
	if (value[1] == 'mile') {
		$('#distanceUnits').val('miles');
	} else {
		$('#distanceUnits').val('kilometer');
	}
};

// EVENT LISTENERS

const timeBtn = $('#timeBtn');
timeBtn.on('click', calculateTime);
// console.log(timeBtn);

const distanceBtn = $('#distanceBtn');
distanceBtn.on('click', calculateDistance);
// console.log(distanceBtn);

const paceBtn = $('#paceBtn');
paceBtn.on('click', calculatePace);
// console.log(distanceBtn);

const eventSelect = $('#eventSelect');
eventSelect.on('change', eventFill);

const splitsBtn = $('#splitsBtn');
splitsBtn.on('click', renderSplits);

// RENDER SPLITS
