# End to End Tests

These image source provide a docker container that automatically runs all tests against the REST API upon startup.

To run the tests, use

    docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build test-e2e
    
