function ChatGame()
{
	this.clothesOptions =
	[
		'their birthday suit',
		'swimwear',
		'just underwear',
		'a kimono',
		'nightwear',
		'street clothes',
		'a costume',
		'their work clothes',
		'baby clothes',
		'a school uniform'
	];
	
	this.raceOptions =
	[
		'Caucasian',
		'Asian',
		'Black',
		'Animal',
		'Fantasy'
	];
	this.orientationOptions =
	[
		'bi',
		'attracted to women',
		'attracted to men',
		'asexual'
	];
	
	this.options =
	[
		{ // 0
			descriptor : this.physicalAge,
			severity : true
		},
		{ // 1
			descriptor : this.clothes,
			//dieSize : this.clothesOptions.length
			options : this.clothesOptions
		},
		{ // 2
			descriptor : this.skill,
			severity : true
		},
		{ // 3
			descriptor : this.race,
			//dieSize : this.raceOptions.length
			options : this.raceOptions
		},
		{ // 4
			descriptor : this.mind,
			severity : true
		},
		{ // 5
			descriptor : this.language,
			severity : true
		},
		{ // 6
			descriptor : this.breast,
			severity : true
		},
		{ // 7
			descriptor : this.butt,
			severity : true
		},
		{ // 8
			descriptor : this.height,
			severity : true
		},
		{ // 9 
			descriptor : this.belly,
			severity : true
			// TODO: add option of pregnancy.
		},
		{ // 10
			descriptor : this.libido,
			severity : true
		},
		{ // 11
			descriptor : this.orientation,
			options : this.orientationOptions
		},
		{ // 12
			descriptor : this.hairColour,
			dieSize : 256,
			dieNumber : 3
		},
		{ // 13
			descriptor : this.job,
			dieSize : 10
		},
		{ // 14
			descriptor : this.name
		},
		{ // 15
			descriptor : this.mentalAge,
			severity : true
		}
	];
}

ChatGame.prototype.takeTurn = function(name)
{
	var option = this.getRandomEntry(this.options);

	var randomResults = {};
	
	randomResults.severity = this.rollSeverity();
	
	var dieRoll = { total: -1, rolls : []}
	if (option.dieSize)
	{
		if (option.dieNumber === undefined)
		{
			option.dieNumber = 1;
		}
		
		dieRoll = this.rollDie(option.dieSize, option.dieNumber);
	}
	randomResults.dieRoll = dieRoll;
	
	if (option.options)
	{
		randomResults.optionValue = this.getRandomEntry(option.options);
	}
	
	return option.descriptor.call(this, name, randomResults);
}

ChatGame.prototype.rollDie = function(size, number)
{
	if (number === undefined)
	{
		number = 1;
	}
	
	var rolls = [];
	var total = 0;
	
	for (var i = 0; i < number; i++)
	{
		var roll = 1 + Math.floor(Math.random() * size)
		
		rolls.push(roll);
		total += roll;
	}
	
	var result =
	{
		rolls	: rolls,
		total	: total
	};
	return result;
}

ChatGame.prototype.getRandomEntry = function(list)	// Utility method.
{
	var entryNo = Math.floor(Math.random() * list.length);
	console.log('entryNo: ' + entryNo);
	
	return list[entryNo];
}

ChatGame.prototype.rollSeverity = function()
{
	var result = {};
	
	// Increase or decrease is determined with a d2.
	result.direction = this.rollDie(2).total == 1 ? 'decrease' : 'increase';
	
	// Magnitude is determined with a d20.
	result.magnitude = this.rollDie(20).total;
	
	return result;
}

// Results
ChatGame.prototype.physicalAge = function(name, randomResults)
{
	var severity = randomResults.severity;
	var olderOrYounger = severity.direction == 'increase' ? 'older' : 'younger';
	
	return name + ' grows ' + olderOrYounger + ', magnitude ' + severity.magnitude;
}

ChatGame.prototype.clothes = function(name, randomResults)
{
	var clothesType = randomResults.optionValue;
	
	return name + ' is now dressed in ' + clothesType;
}

ChatGame.prototype.skill = function(name, randomResults)
{
	var severity = randomResults.severity;
	var gainsOrLoses = severity.direction == 'increase' ? 'gains' : 'loses';
	
	return name + ' ' + gainsOrLoses + ' a skill of magnitude ' + severity.magnitude;
}

ChatGame.prototype.race = function(name, randomResults)
{
	var race = randomResults.optionValue;
	
	return name + '\'s race is now ' + race;
}

ChatGame.prototype.mind = function(name, randomResults)
{
	var severity = randomResults.severity;
	var positiveOrNegative = severity.direction == 'increase' ? 'negative' : 'positive';
	
	return name + ' has a ' + positiveOrNegative + ' change of mind of magnitude ' + severity.magnitude;
}

ChatGame.prototype.language = function(name, randomResults)
{
	var severity = randomResults.severity;
	var gainsOrLoses = severity.direction == 'increase' ? 'gains' : 'loses';
	
	return name + ' ' + gainsOrLoses + ' a language, magnitude ' + severity.magnitude;
}

ChatGame.prototype.breast = function(name, randomResults)
{
	var severity = randomResults.severity;
	var growOrShrink = severity.direction == 'increase' ? 'grow' : 'shrink';
	
	return name + '\'s breasts ' + growOrShrink + ', magnitude ' + severity.magnitude;
}

ChatGame.prototype.butt = function(name, randomResults)
{
	var severity = randomResults.severity;
	var growOrShrink = severity.direction == 'increase' ? 'grows' : 'shrinks';
	
	return name + '\'s butt ' + growOrShrink + ', magnitude ' + severity.magnitude;
}

ChatGame.prototype.height = function(name, randomResults)
{
	var severity = randomResults.severity;
	var growOrShrink = severity.direction == 'increase' ? 'grows' : 'shrinks';
	
	return name + ' ' + growOrShrink + ', magnitude ' + severity.magnitude;
}

ChatGame.prototype.belly = function(name, randomResults)
{
	var severity = randomResults.severity;
	var growOrShrink = severity.direction == 'increase' ? 'expands' : 'shrinks';
	
	return name + '\s belly ' + growOrShrink + ', magnitude ' + severity.magnitude;
}

ChatGame.prototype.libido = function(name, randomResults)
{
	var severity = randomResults.severity;
	var growOrShrink = severity.direction == 'increase' ? 'increases' : 'decreases';
	
	return name + '\'s libido ' + growOrShrink + ', magnitude ' + severity.magnitude;
}

ChatGame.prototype.orientation = function(name, randomResults)
{
	//var orientation = this.orientationOptions[dieRoll.total];
	var orientation = randomResults.optionValue;
	
	return name + ' is now ' + orientation;
}

ChatGame.prototype.intelligence = function(name, randomResults)
{
	var severity = randomResults.severity;
	
	if (severity.direction == 'increases')
	{
		return name + ' becomes smarter, magnitude ' + severity.magnitude;
	}
	else
	{
		return name + ' becomes dumber, magnitude ' + severity.magnitude;
	}
}

ChatGame.prototype.hairColour = function(name, randomResults)
{
	var dieRoll = randomResults.dieRoll;
	var rolls = dieRoll.rolls;
	
	return name + '\'s hair colour changes to: ' + rolls[0] + ', ' + rolls[1] + ', ' + rolls[2] + ' (RGB)';
}

ChatGame.prototype.job = function(name, randomResults)
{
	var dieRoll = randomResults.dieRoll;
	var total = dieRoll.total;
	
	return name + '\'s job changes: ' + total + ' out of 10';
}

ChatGame.prototype.name = function(name)
{
	return name + '\'s name changes';
}

ChatGame.prototype.mentalAge = function(name, randomResults)
{
	var severity = randomResults.severity;
	var olderOrYounger = severity.direction == 'increase' ? 'mature' : 'childish';
	
	return name + ' grows more ' + olderOrYounger + ', magnitude ' + severity.magnitude;
}

module.exports = ChatGame;