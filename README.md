# Team Portfolio Generator

### Description
This repo contains a Team Portfolio Generator. Users initialise NPM in their CLI using ‘npm index.js’ and are queried with 4 questions: name, occupation, email and id. Depending on user’s selection of occupation (either Manager, Intern or Engineer), 1 unique question pertaining to that selection is also generated. Data from the responses is appended to a ‘team_profile.html’ in the ‘dist’ directory and this is styled with the linked css style sheet. Users can add more team members with ‘npm index.js’. 

There is test for each of the classes (Employee, Manager, Engineer and Intern) in the 'test' directory which uses the Jest package. These tests check to see that properties from each of the 4 classes have been properly exported.

### Screencast Walkthrough

This walkthrough video takes you through the various steps involved in initialising and using the Team Portfolio Generator: https://youtu.be/kYSs4BJ1T18 
