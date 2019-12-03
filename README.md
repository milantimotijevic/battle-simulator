BATTLE SIMULATOR

OVERVIEW:

This is a backend NodeJS application which allows the user to
create and run console-based RNG battles.
The user interacts with the application through the API.
This allows them to create a battle and a number of armies,
add those armies into the battle and run it.
Once run, the battle will be displayed in the console, but its
log will also be preserved in the database.

Each army will select its target based on its own attack
strategy, which is specified upon army's creation. The damage
and likelihood of their attacks landing will depend on their
unit count. Each attack, whether it was successful or not,
will incur a short reload timer. The latter also depends on
the army's unit count.

FEATURES:

Parametrization - The application uses a .env file to
parametrize certain aspects of the game logic. It also allows
you to enable/disable battle-related logging from showing up
in the console.

Data persistence - All battle and army data is stored in
the database, which means a battle can easily pick up
where it left of in case the application is prematurely
terminated.

Concurrency - The application uses an async-await approach
which allows armies to act independently. This means that
each army is free to perform its operations without needing
to wait for other armies to perform theirs. This was, of
course, done within the bounds of Node's event loop, which
means it still happens on a single thread.

Fault tolerance - The application will gracefully terminate
its battle-related processes in case data is tampered with
during a fight. In other words, deleting armies from the
database during a running battle will cause the application
to pick up this change, log out an appropriate message and
terminate affected processes.

Postman - A Postman collection/environment is included
in {root}/postman directory. You may also find information
on endpoints in {root}/src/api/routes/{army/battle}/index.

Input validation - Faulty data sent through the endpoints
will be rejected with a suitable error message, informing
the user which parameters were wrong.


PRE-REQUISITES:
1. NodeJS installed on your machine;
2. Access to MongoDB.

TECHNOLOGY STACK:
1. hapi.js - REST framework,
2. joi - input validation library,
3. Boom - error handling library,
4. Mongoose - ODM for MongoDB.

DEPLOYMENT:
1. Provide DB access -
Navigate into project's root and open the .env file.
Inside you will a parameter called DATABASE_CONNECTION_STRING.
Give it a valid MongoDB connection string.
2. Install dependencies -
Run 'npm install' inside project's root.
3. Start the application -
Run 'npm start' inside project's root.

BASIC INSTRUCTIONS:

Refer to {root}/src/api/routes/{army/battle}/index files,
or the Postman collection/environment for details.

A battle needs to be created using the POST /battle endpoint.
You will then need to create at least 10 armies (this can be
parametrized in the .env file) using the POST /army endpoint.

An army is added into a battle using the
POST /army/battle/{armyId}/{battleId} endpoint.

A battle is started using the PUT /battle/{battleId}/start
endpoint. While the battle is running, you may hit
/battle/{{battle_id}}/reset to reset it. This will cause
the battle participants to be reset to their starting values
and their battle processes (attacks) to be terminated. You
may then start the battle again using the start endpoint.

You may also use the /battle/quickstart endpoint to
automatically create a battle with 10 hardcoded armies.

There is a limit to how many battles can run at the same time
and this can be changed in the .env file.
