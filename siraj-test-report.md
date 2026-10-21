# Siraj's Test Report – Player Input

**Project:** Rock, Paper, Scissors vs. the Evil AI  
**Component:** `getPlayerSelection()`  
**Tester:** Siraj Luqman

## Test Results

| No. | Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| 1 | Uppercase input with extra spaces (`  ROCK  `) | Accept input and return `"Rock"` | Accepted as Rock | Pass |
| 2 | Invalid input (`banana`) | Display an error and ask again | Invalid-choice alert appeared | Pass |
| 3 | Empty input | Display an error and ask again | Invalid-choice alert appeared | Pass |
| 4 | Valid input after invalid input (`Paper`) | Accept the selection and continue the game | Paper was accepted; the round continued | Pass |
| 5 | Cancel the prompt | Return `null` and stop the game safely | Console reported that the player cancelled the game | Pass |

## Conclusion

The tested player-input functionality behaved as expected. It accepted valid selections, handled uppercase letters and unnecessary spaces, rejected invalid and empty inputs, and handled prompt cancellation safely.

Further testing can be performed during integration to verify that the input function continues to work correctly with the complete game.
