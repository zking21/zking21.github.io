
function getStats(txt) {

    let str = txt.toLowerCase().replace(/[^\w\s]|_/g, " ");
    let strArr = str.trim().split(/\s+/);

    let nChars = str.length;

    let nWords = strArr.length;

    let nLines = txt.split(/\n/).length;

    let nNonEmptyLines = countNonEmptyLines(txt);

    let maxLineLength = getMaxLineLength(txt);

    let averageWordLength = getAvgWordLength(nWords, strArr);

    let palindromes = findPalindromes(strArr);

    let longestWords = getLongestWords(strArr);

    let mostFrequentWords = getMostFrequentWords(strArr);

    return {
        nChars,
        nWords,
        nLines,
        nNonEmptyLines,
        maxLineLength,
        averageWordLength,
        palindromes,
        longestWords,
        mostFrequentWords
    };
}

function countNonEmptyLines(txt)   {
    let numLines = 0;
    let lines = txt.split(/\n/);

    for(let i=0; i < lines.length; i++) {
        if (!lines[i].replace(/\s/g, '').length) continue;  //The line only had whitespace so go to next line
        else if (lines[i].length > 0) numLines++;
    }

    return numLines;
}

function getMaxLineLength(txt) {
    let strArr = txt.split(/\n/);
    let len = 0;

    for (let i=0; i < strArr.length; i++)   {
        if (strArr[i].length > len) {
            len = strArr[i].length;
        }
    }

    return len;
}

function getAvgWordLength(nWords, strArr) {
    let totalWordLength = 0;
    for (let i=0; i < strArr.length; i++)  {
        totalWordLength += strArr[i].length;
    }

    return totalWordLength/nWords;
}

function findPalindromes(strArr)  {
    let palindromes = [];

    for (let i=0; i < strArr.length; i++)  {
        if(strArr[i].length > 2 && strArr[i] == strArr[i].split('').reverse().join('')){
            palindromes.push(strArr[i]);
        }
    }
    return palindromes;
}

function getLongestWords(strArr)  {
   let dictionary = {};
   let word;

   //Populate dictionary
   for(let i=0; i < strArr.length; i++)    {
        word = strArr[i];
        if(word in dictionary)  {
            dictionary[word]++;
        }
        else    {
            dictionary[word] = 1;
        }
    }

    //Store in array which eliminates duplicates
    let result = [];
    for (word in dictionary)   {
        result.push(word);
    }

    //Sort by length
    result.sort(function(a, b) {
        return b.length - a.length ||   //Descending order
        a.localeCompare(b);             //Alphabetical 
    });

    //Return first 10 elements
    return result.slice(0,10);
}

function getMostFrequentWords(strArr) {
    let frequency = {}; //works like a dictionary
    let word; //key

    //Populate "dictionary"
    for(let i=0; i < strArr.length; i++)    {
        word = strArr[i];
        if(word in frequency)  {
            frequency[word]++;
        }
        else    {
            frequency[word] = 1;
        }
    }

    //Store in array
    let result = [];
    for (word in frequency) {
        result.push(word);
    }

    //Sort by frequency
    result.sort(function (a,b)   {
        return frequency[b] - frequency[a] ||   //Descending order
        a.localeCompare(b);                     //Alphabetical order
    });

    //Format elements to include frequency value
    for (let i=0; i < result.length; i++)   {
        result[i] = result[i] + '(' + frequency[result[i]] + ')';
    }

    //Return first 10 elements
    return result.slice(0,10);
}


/*
Original Skeleton
return {
    nChars: 123,
    nWords: 22,
    nLines: 10,
    nNonEmptyLines: 22,
    averageWordLength: 3.3,
    maxLineLength: 33,
    palindromes: ["12321", "kayak", "mom"],
    longestWords: ["xxxxxxxxx", "123444444"],
    mostFrequentWords: [ "hello(7)", "world(1)" ]
};

To get the longest word
for (let i=0; i < strArr.length; i++) {
    if(strArr[i].length > longestWord.length)  {
        longestWord = strArr[i];
    }
}

getMostFrequentWords notes

    let result = [];
    let tempStr = "";
    for (word in frequency) {
        tempStr = word + '(' + frequency[word] + ')';
        result.push(tempStr);
    }
    
*/
