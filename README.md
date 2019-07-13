# regex-demo
A basic introduction into Regular Expressions for Trilogy Education Pre-class session

## Overview
What are regular expressions? 

Regular expressions are character sequences used to define search patterns for other character sequences (strings).

Why use regular expressions?

In basic cases, you can get away with doing parsing in more primitive ways. For example, you can use methods like [`String.prototype.indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) to find the position of a character in a string. From there you can use [`String.prototype.substring`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring) to extract part of the original string, based on the positions you found earlier.

What if you need to handle multiple options? Do you need to call `indexOf` 4 or 5 times, keep track of all the results, and do multuple substrings based on which indexes were found? It quickly becomes overly complicated and doesn't scale well.

You may not be interested in extracting data from a string, but rather just ensuring it meets some kind of criteria (think user input validation).

## A case study

Given an email address (submitted by a user), how would you extract the username and the domain?

For example: `some.user@some-domain.com`

The username is `some.user`.
The domain is `some-domain.com`.

How would you do this extraction?

Maybe something like this?
```javascript
function parseEmailWithoutRegex(email) {
	var atPosition = email.indexOf('@');
	var username = email.substring(0, atPosition);
	var domain = email.substring(atPosition + 1);
	return {
		username: username,
		domain: domain
	};
}
```

That's not too bad.

What about if we also wanted to get the top level domain from the email address? Looking at the same example, that would be `.com`.

We could enhance the prior function to look this way:
```javascript
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
```
Now it's starting to get complicated.

Here's how we could do it using regular expressions:
```javascript
function parseEmailWithTLDWithRegex(email) {
	var regexResult = /^([^\@]+)\@([^.]+)(.+)$/.exec(email);
	return {
		username: regexResult[1],
		domain: regexResult[2] + regexResult[3],
		tld: regexResult[3]
	};
}
```
`/^([^\@]+)\@([^.]+)(.+)$/` is the regular expression. Let's break down what this thing means.

* In JavaScript, regular expressions start and end with `/`
* `^` signifies the start of the input string
* Anything wrapped in parenthesis `()` is a "capture group". This means part of the string that matches will be "captured" or "extracted" for use after the parsing is done
* `[^\@]` says to match any character that _is not_ `@`. The `+` after means to do this 1 or many times
* `\@` matches `@` literally
* `([^.]+)` says to match 1 or many characters that are not periods. This is also captured because it's wrapped in parenthesis
* `(.+)` says to match 1 or many characters that are anything _not_ line-breaks (and capture them).
* `$` signifies the end of the input string

Once the regex runs, we can then access the "capture groups" just like using an array:
`regexResult[1]` gets the first capture group, and so on.
