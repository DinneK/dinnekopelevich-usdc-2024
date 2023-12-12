/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  console.log({ searchTerm });
  var result = {
    SearchTerm: "",
    Results: [],
  };

  result.SearchTerm = searchTerm;

  let bookMatch = false;

  scannedTextObj.forEach((bookObj) => {
    bookObj.Content.forEach((page) => {
      const words = page.Text.split(/\s+/);

      if (words.some((word) => word === searchTerm)) {
        result.Results.push({
          ISBN: bookObj.ISBN || "ISBN does not exist",
          Page: page.Page || "Page Number does not exist",
          Line: page.Line || "Line number does not exist",
        });

        bookMatch = true;
      }
    });

    if (!bookMatch) {
      result.Results = [];
    }
  });

  console.log({ result });
  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

const twentyLeaguesIn2 = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    Content: [
      {
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

const twentyLeaguesOut2 = {
  SearchTerm: "and",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 10,
    },
  ],
};

const twentyLeaguesOut3 = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "ISBN does not exist",
      Page: 31,
      Line: "Line number does not exist",
    },
  ],
};

/*
  _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
  | | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
  | | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
  | |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
  \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
  */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

//Should return a negative response if the search term is not found
const test3result = findSearchTermInBooks("burger", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) !== JSON.stringify(test3result)) {
  console.log("PASS: Test 3");
} else {
  console.log("FAIL: Test 3");
  console.log("Expected:", []);
  console.log("Received:", test3result.Results);
}

//Should return a negative response if case does not match
const test4result = findSearchTermInBooks("Eyes", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) !== JSON.stringify(test4result)) {
  console.log("PASS: Test 4");
} else {
  console.log("FAIL: Test 4");
  console.log("Expected:", []);
  console.log("Received:", test4result.Results);
}

//Should return an empty array if no match found
const test5result = findSearchTermInBooks("Helloo", twentyLeaguesIn);
if (!test5result.Results.length) {
  console.log("PASS: Test 5");
} else {
  console.log("FAIL: Test 5");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test5result.Results.length);
}

//Should return an array of multiple objects if more than one result is found
const test6result = findSearchTermInBooks("and", twentyLeaguesIn);
if (test6result.Results.length === 2) {
  console.log("PASS: Test 6");
} else {
  console.log("FAIL: Test 6");
  console.log("Expected:", twentyLeaguesOut2.Results.length);
  console.log("Received:", test6result.Results.length);
}

//Should check the structure of the objects in the array
const test7result = findSearchTermInBooks("and", twentyLeaguesIn);
if (test7result.Results.length > 0) {
  const firstResult = test7result.Results[0];

  if ("ISBN" in firstResult && "Page" in firstResult && "Line" in firstResult) {
    console.log("PASS: Test 7");
  } else {
    console.log("FAIL: Test 7");
    console.log(
      "Expected: Result objects with ISBN, Page, and Line properties"
    );
    console.log("Received:", "Result objects with missing properties");
  }
}

//Should ensure execution time is reasonable
const test8result = (func, ...args) => {
  const startTime = performance.now();
  func(...args);
  const endTime = performance.now();
  return endTime - startTime;
};

const executionTime = test8result(
  findSearchTermInBooks,
  "and",
  twentyLeaguesIn
);

const reasonableThreshold = 2; // milliseconds

if (executionTime < reasonableThreshold) {
  console.log("PASS: Test 8");
  console.log("Execution Time:", executionTime.toFixed(2), "milliseconds");
} else {
  console.log("FAIL: Test 8");
  console.log(
    "Expected: Execution time less than",
    reasonableThreshold,
    "milliseconds"
  );
  console.log(
    "Received: Execution Time:",
    executionTime.toFixed(2),
    "milliseconds"
  );
}

//Should return a message for missing properties if search is valid
const test9result = findSearchTermInBooks("the", twentyLeaguesIn2);
if (JSON.stringify(twentyLeaguesOut3) === JSON.stringify(test9result)) {
  console.log("PASS: Test 9");
} else {
  console.log("FAIL: Test 9");
  console.log("Expected:", twentyLeaguesOut3);
  console.log("Received:", test9result);
}
