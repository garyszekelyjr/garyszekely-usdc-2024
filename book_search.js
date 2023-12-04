/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
*/
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    // Array to store the Results Objects
    const Results = [];
    // If the inputs are valid
    if (searchTerm && Array.isArray(scannedTextObj)) {
        // Iterate over each book
        for (const Book of scannedTextObj) {
            // Store the ISBN
            const ISBN = Book['ISBN'];
            // Iterate over the content of each book
            for (const Content of Book['Content']) {
                // If the content contains the searchTerm, then add the Object to the Results Array
                if (Content['Text'].includes(searchTerm)) {
                    const Page = Content['Page'];
                    const Line = Content['Line'];
                    Results.push({ ISBN, Page, Line });
                }
            }
        }
    }

    return { 'SearchTerm': searchTerm, Results };
}

/*
    _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
    | | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
    | | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
    | |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
    \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/                      
*/

// Example input object
const twentyLeaguesIn = [
    {
        'Title': 'Twenty Thousand Leagues Under the Sea',
        'ISBN': '9780000528531',
        'Content': [
            {
                'Page': 31,
                'Line': 8,
                'Text': 'now simply went on by her own momentum.  The dark-'
            },
            {
                'Page': 31,
                'Line': 9,
                'Text': 'ness was then profound; and however good the Canadian\'s'
            },
            {
                'Page': 31,
                'Line': 10,
                'Text': 'eyes were, I asked myself how he had managed to see, and'
            }
        ]
    }
]

// Example output object
const twentyLeaguesOut = {
    'SearchTerm': 'the',
    'Results': [
        {
            'ISBN': '9780000528531',
            'Page': 31,
            'Line': 9
        }
    ]
}


// TEST 1: verify input/output
const test1Result = findSearchTermInBooks('the', twentyLeaguesIn);
if (JSON.stringify(test1Result) === JSON.stringify(twentyLeaguesOut)) {
    console.log('PASS: Test 1');
} else {
    console.log('FAIL: Test 1');
    console.log('Expected:', twentyLeaguesOut);
    console.log('Received:', test1Result);
}


// TEST 2: correct # of results with single book
const test2Result = findSearchTermInBooks('the', twentyLeaguesIn);
if (test2Result.Results.length === 1) {
    console.log('PASS: Test 2');
} else {
    console.log('FAIL: Test 2');
    console.log('Expected:', twentyLeaguesOut.Results.length);
    console.log('Received:', test2Result.Results.length);
}


// TEST 3: correct # of results with multiple books
const test3Input = [
    {
        'Title': 'Twenty Thousand Leagues Under the Sea',
        'ISBN': '9780000528531',
        'Content': [
            {
                'Page': 31,
                'Line': 8,
                'Text': 'now simply went on by her own momentum.  The dark-'
            },
            {
                'Page': 31,
                'Line': 9,
                'Text': 'ness was then profound; and however good the Canadian\'s'
            },
            {
                'Page': 31,
                'Line': 10,
                'Text': 'eyes were, I asked myself how he had managed to see, and'
            }
        ]
    },
    {
        'Title': 'Fake Book',
        'ISBN': '1',
        'Content': [
            {
                'Page': 1,
                'Line': 1,
                'Text': 'the'
            },
        ]
    }
]
const test3Output = {
    'SearchTerm': 'the',
    'Results': [
        {
            'ISBN': '9780000528531',
            'Page': 31,
            'Line': 9
        },
        {
            'ISBN': '1',
            'Page': 1,
            'Line': 1
        }
    ]
}
const test3Result = findSearchTermInBooks('the', test3Input);
if (test3Result.Results.length === 2) {
    console.log('PASS: Test 3');
} else {
    console.log('FAIL: Test 3');
    console.log('Expected:', test3Input.length);
    console.log('Received:', test3Output['Results'].length);
}


// TEST 4: casing
const test4Result = findSearchTermInBooks('CANADIAN', twentyLeaguesIn);
if (test4Result['Results'].length === 0) {
    console.log('PASS: Test 4');
} else {
    console.log('FAIL: Test 4');
    console.log('Expected:', 0);
    console.log('Received:', test3Result['Results'].length);
}

// TEST 5: null inputs should return valid array
const test5Result = findSearchTermInBooks(null, null)
if (Array.isArray(test5Result['Results'])) {
    console.log('PASS: Test 5');
} else {
    console.log('FAIL: Test 5');
}


// TEST 6: Book with empty content should return empty result
const test6Input = [
    {
        'Title': 'Twenty Thousand Leagues Under the Sea',
        'ISBN': '9780000528531',
        'Content': []
    }
]
const test6Result = findSearchTermInBooks('the', test6Input);
if (test6Result['Results'].length === 0) {
    console.log('PASS: Test 6');
} else {
    console.log('FAIL: Test 6');
    console.log('Expected:', 0);
    console.log('Received:', test6Result['Results'].length);
}
