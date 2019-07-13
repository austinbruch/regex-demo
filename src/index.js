function parseEmailWithoutRegex(email) {
	var atPosition = email.indexOf('@');
	var username = email.substring(0, atPosition);
	var domain = email.substring(atPosition + 1);
	return {
		username: username,
		domain: domain
	};
}

function parseEmailIncludingTLDWithoutRegex(email) {
	var atPosition = email.indexOf('@');
	var username = email.substring(0, atPosition);
	var domain = email.substring(atPosition + 1);
	var periodPosition = domain.lastIndexOf('.');
	var tld = domain.substring(periodPosition);
	return {
		username: username,
		domain: domain,
		tld: tld
	};
}

function parseEmailWithRegex(email) {
	var regexResult = /^([^\@]+)\@([^\s]+)$/.exec(email);
	return {
		username: regexResult[1],
		domain: regexResult[2]
	};
}

function parseEmailWithTLDWithRegex(email) {
	var regexResult = /^([^\@]+)\@([^.]+)(.+)$/.exec(email);
	return {
		username: regexResult[1],
		domain: regexResult[2] + regexResult[3],
		tld: regexResult[3]
	};
}

var testEmails = ['some.user@some-domain.com'];

testEmails.forEach(function(email) {
	console.log('without regex\t', JSON.stringify(parseEmailWithoutRegex(email)));
	console.log('without regex\t', JSON.stringify(parseEmailIncludingTLDWithoutRegex(email)));
	console.log('with regex\t', JSON.stringify(parseEmailWithRegex(email)));
	console.log('with regex\t', JSON.stringify(parseEmailWithTLDWithRegex(email)));
});
