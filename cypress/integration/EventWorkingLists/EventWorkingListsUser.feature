Feature: User interacts with event working lists

Scenario: User opens the default working list for an event program
Given you open the main page with Ngelehun and malaria case context
Then the default working list should be displayed
And rows per page should be set to 15
And for an event program the page navigation should show that you are on the first page

Scenario: Show only events assigned to anyone using the predefined working list
Given you open the main page with Ngelehun and malaria case context
When you select the working list called events assigned to anyone
Then the assigned to filter button should show that the anyone filter is in effect
And the list should display events assigned to anyone
And rows per page should be set to 15
And for an event program the page navigation should show that you are on the first page

Scenario: Show only events assigned to anyone using the filter
Given you open the main page with Ngelehun and malaria case context
When you set the assignee filter to anyone
And you apply the current filter
Then the assigned to filter button should show that the anyone filter is in effect
And the list should display events assigned to anyone
And rows per page should be set to 15
And for an event program the page navigation should show that you are on the first page

Scenario: Show only active events assigned to anyone using the filter
Given you open the main page with Ngelehun and malaria case context
When you set the assignee filter to anyone
And you apply the current filter
And you set the status filter to active
And you apply the current filter
Then the assigned to filter button should show that the anyone filter is in effect
And the status filter button should show that the active filter is in effect
And the list should display active events that are assigned to anyone
And rows per page should be set to 15
And for an event program the page navigation should show that you are on the first page

Scenario: Show only events where age is between 10 and 20 using the filter
Given you open the main page with Ngelehun and malaria case context
When you set the age filter to 10-20
And you apply the current filter
Then the age filter button should show that the filter is in effect
And the list should display events where age is between 10 and 20
And rows per page should be set to 15
And for an event program the page navigation should show that you are on the first page

Scenario: Show the Household location column
Given you open the main page with Ngelehun and malaria case context
When you open the column selector
And you select Household location and save from the column selector
Then Household location should display in the list

Scenario: Show next page
Given you open the main page with Ngelehun and malaria case context
When you click the next page button
Then the list should display data for the second page
And the pagination for the event working list should show the second page

Scenario: Show next page then previous page
Given you open the main page with Ngelehun and malaria case context
When you click the next page button
Then the list should display data for the second page
And the pagination for the event working list should show the second page
When you click the previous page button
Then the default working list should be displayed
And for an event program the page navigation should show that you are on the first page

Scenario: Show next page then first page
Given you open the main page with Ngelehun and malaria case context
When you click the next page button
Then the list should display data for the second page
And the pagination for the event working list should show the second page
When you click the first page button
Then the default working list should be displayed
And for an event program the page navigation should show that you are on the first page

Scenario: Show 10 rows per page
Given you open the main page with Ngelehun and malaria case context
When you change rows per page to 10
Then the list should display 10 rows of data
And for an event program the page navigation should show that you are on the first page

Scenario: Show events ordered ascendingly by report date 
Given you open the main page with Ngelehun and malaria case context
When you click the report date column header
Then the sort arrow should indicate ascending order
And the list should display data ordered descendingly by report date
And for an event program the page navigation should show that you are on the first page