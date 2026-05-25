Feature: User Login
    This feature is aimed at testing the critical flow of the application. 
    It is to test login of user with various credentials
    In case of valid credentials, it should allow user to loginI
    For invalid credentials, access should be denied

    Scenario: User login successfuly
        Given the user is on login page
        When  the user enter valid credentials for the application
        Then  the user should see the successful login message

    Scenario: User attempts to login without valid credentials
        Given the user is on login page
        When  the user enter invalid Password for existing user
        Then  the application shows a proper error message for denying access