# End to End Tests

These image sources provide a Docker container that automatically runs all tests against the REST API upon startup.

To run the tests, use

    docker-compose up --build

to first set up the stack (allow some time for database initialization, if needed). Then

    docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build test-e2e
    
to run the tests.
