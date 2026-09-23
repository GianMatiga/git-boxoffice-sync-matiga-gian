Git Box Office Sync Workflow
1. Final calculateTicketPrice Function

The final calculateTicketPrice function combines four pricing changes that were made at different points in the workflow.

The calculation first multiplies quantity by basePrice to get the original ticket total. Clone A introduced the 10% group discount, so orders with 5 or more tickets are reduced by 10%. Clone C then added the 50% VIP surcharge when premium is true. During Task 6, Clone A added the flat $10 discount, which is subtracted from the price after the other adjustments. Clone B changed the final operation from Math.floor() to Math.round(), so the resulting price is rounded to the nearest whole number.

The important part is that these changes are not separate functions. They all modify the same price calculation. Because of this, the order of the operations matters. For example, the $10 discount is applied after the group discount and VIP surcharge, while the rounding happens at the end. The final function therefore required us to preserve not only each contributor's change but also the correct order in which those changes should be applied.

2. Task 3 Two-Way Conflict vs. Task 5 Three-Way Conflict

Task 3 was a two-way conflict because the local changes from Clone B and the remote changes from Clone A were modifying the same part of tickets.js. Clone A had changed the calculation to include the group discount, while Clone B had changed the rounding method. Git could not automatically decide which version should remain because both branches changed the same lines.

Task 5 became more difficult because Clone C had created another version of the same function before receiving the previous changes. Clone C's version contained the VIP surcharge and Math.floor(), while the remote branch already contained the group discount and Math.round(). The resolution therefore had to combine the VIP logic with the existing group discount and rounding behavior.

The main difficulty with the third line of work was not simply having more contributors. The problem was that the contributors were changing the same shared code in different ways and at different times. Each additional change increased the number of things that had to be preserved. We had to reason about which parts of each version were intentional changes instead of simply choosing one side of the conflict.

3. Why the Flat $10 Discount Affected the Other Tests

The flat $10 discount changed the expected results of other tests because calculateTicketPrice() is a shared function. The existing group-discount and VIP calculations also call this function, so adding:

price = price - 10;

changed the output of those existing calculations as well.

This is why the test expectations had to be reconsidered during Task 6. The new discount was not operating independently from the other pricing rules. It became another step in the same calculation pipeline.

This shows that an "isolated" change in shared code is only isolated in terms of its purpose, not necessarily its effect. A developer may intend to add one new feature, but if that feature is inserted into a function used by several existing features, the behavior of those features can change too. This is why we had to run the complete test suite after resolving the rebase conflicts instead of testing only the new $10 discount.

4. Process Change That Could Have Prevented the Rejected Pushes

The main process change I would make is to require contributors to synchronize with the remote branch before starting work on a shared feature branch.

The rejected pushes happened because a contributor was working from an older version of feature/group-pricing. Clone B had a commit that Clone A's branch did not have, so its push was rejected. Clone C later had the same situation because the remote branch had already moved forward. Clone A experienced it again in Task 6 because it started from an older commit and attempted to push after other changes had already been added remotely.

If the team had a rule such as "fetch and integrate the latest remote changes before starting work", each contributor would have started from the current branch state. They would still potentially encounter conflicts if they edited the same lines, but those conflicts would be handled before attempting the push. This would make the workflow more predictable and prevent the repeated cycle of make changes → push → rejection → fetch → resolve conflict.
