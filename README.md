# The Tasty Palette
The Tasty Palette is a recipe app where users can view, create, edit, review and delete the recipes they have added onto the app. This project was a group project with 3 other people. We had one week to complete the app.
## Deployment Link
[Live Deployment](https://the-tasty-pallete-f0000d235851.herokuapp.com/)

## Technologies Used
- HTML
- CSS
- Saas
- Bootstrap
- React
- Node.JS
- Express
- MongoDB
- Insomnia
- Cloudinary
- Heroku

## Brief
- Build a full-stack application by making your own backend and your own front-end.
- Use an Express API to serve your data from a Mongo database.
- Consume your API with a separate front-end built with React.
- Be a complete product with multiple relationships and CRUD functionality for at least a couple of models.
- Have a visually impressive design.
- Be deployed online so it is publicly accessible.

Necessary deliverables:
- A working app hosted on the internet.
- A git repository hosted on Github, with frequent commits dating back to the very beginning of the project.
- A readme file.

## Planning
### Wireframe:
We created a wireframe on Excalidraw and  bounced around ideas on what our app should look like and the pages involved. We then decided on a colour scheme and started to plan out our build process.

![Screenshot 2023-12-05 at 17 10 38](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/d5ae1abe-c61b-4b49-b4d8-b3e87246396f)

<img width="1100" alt="Screenshot 2024-02-13 at 10 30 28" src="https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/d1505b26-38d5-471e-be02-424187f3e3bd">

### Trello:

We also used trello to split the tasks over the days and we discussed in our daily standups regarding which member of the team will be working on a specific task/s for that day. The first task I worked on for the frontend was the Recipe Index page.

![Screenshot 2024-02-13 at 10 33 43](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/dd3a3cf9-2fb3-4b29-8e1b-614dc2a5a2eb)

## Build Process
Our team decided to work on the backend together and split the tasks for the front- end application.  For the backend, we used mongoose to create two main schemas.

### Recipe Schema

![Screenshot 2024-02-13 at 10 36 22](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/772a9176-d1f2-4ed6-a987-fdc4213e2aa0)

We embedded a review schema into our recipe schema so our users can leave reviews for each recipe.

### User Schema

![Screenshot 2024-02-13 at 10 37 19](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/023e2d27-4f73-44e6-9876-d6edd722e801)

### Frontend

**My responsibilities for the front-end:**

We split the tasks and worked our way through each task depending on how long it took and if there were any issues. My main task was to create the Recipe Index page (All Recipes page on app) and to create the dropdown filter by continent, dropdown filter by average rating and a search bar. For the search bar I used a regular expression to allow the user to search a recipe (case- insensitive) and created a new array which will be filtered and include only those that satisfy my requirements such as recipe title and recipe category. I included the requirements for the average rating in this filter.

![Screenshot 2024-02-13 at 10 41 04](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/b526ee64-9077-4341-873a-a810f3658f23)

![Screenshot 2024-02-13 at 10 41 17](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/7c3dde1f-7d47-4140-bfc3-5709eb53c0a1)

I also created the profile page by retrieving the user’s data using authentication where the user’s token is saved in localStorage. I then mapped over the recipes the user has created to display on their profile page, adding an option to edit the recipe that they created by linking it to the edit page. I also added a delete function where they can delete the recipe that they created. If the user did not create a recipe, that recipe will not appear on their profile page and they do not have access to edit or delete those recipes, even on other pages in the app.

![Screenshot 2024-02-13 at 10 42 56](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/4449f114-f851-45e9-9d79-be9196cb67f5)

## Challenges
The main challenge I specifically worked on was the use of a virtual field for average rating which I used in my rating dropdown bar. When the review section was added to our app, my rating dropdown bar would not show the recipes with the rating selected. I checked the console to see  if my code was working how I intended. I updated the backend controllers for the reviews so the average rating would be recalculated when a review was created or deleted.

![Screenshot 2024-02-13 at 10 44 11](https://github.com/ttamanna1/The-Tasty-Palette/assets/138875274/df2e362c-17bb-4acd-bf1c-c637be321879)

## Wins
- Users can edit and delete a recipe that they created which enhances the user’s experience.
- Users can view the recipes they created on their profile page.
- Reviews section in each recipe page where the user can rate the recipe and leave a comment. They can also delete the review they have written.

## Key Learnings
- Better understanding on using the backend and frontend together to make a web app.
- Improving problem solving skills to solve challenges.

## Bugs
A bug we experienced was when the user edited a recipe they created but the image was not edited, then the previous image would not appear after the edit. My teammate, Ying, mainly worked on this bug and fixed it.

## Improvements
- We need to clean up the code in our text editor.
- Enhance the design of our web app.
- Add a like button.
- Add music to our web app.




