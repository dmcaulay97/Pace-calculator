const time = $('#time');
const dist = $('#distance');
const vel = $('#velocity');
const btn = $('#calculate');

btn.on('click', (e) => {
	e.preventDefault(); // stop from reloading page
	const t = time.val();
	const d = dist.val();
	const v = d / t;
	vel.val(v);
	// console.log(v);
	// console.log(dist.val());
	// console.log(time.val());
});
