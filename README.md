# Statemachine for business Processes
https://github.com/jakesgordon/javascript-state-machine/blob/master/docs/states-and-transitions.md

# Postman link
https://www.getpostman.com/collections/7f5ee4f8337e69d3a7ff

# Instructions
1. clone repo
2. npm install
3. npm run start
4. use postman link to get access to the sample queries

first call
GET http://localhost:5000/api/v1/process-names (get a list of all the business processes available)
POST http://localhost:5000/api/v1/launch (will start a process using the process name as JSON in the body e.g. { "processType":"onboarding" } )
http://localhost:5000/api/v1/next (move to next state)
http://localhost:5000/api/v1/back (move back a state)

Look at the onboarding process to see how to add function blocks to each step of the process.