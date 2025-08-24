angular.module('app', ['metawidget']).controller('AppCtrl', function($scope, $http) {

    // Person object
    function personSchema() {
        return {
            firstname: '',
            surname: '',
            age: null,
            email: '',
            address: { street: '', city: '', state: '', postcode: '' },
            children: [
                { name: { firstname: '', surname: '' } }
            ]
        };
    }
    $scope.person = personSchema();

    // Single personConfig with children schema
    $scope.personConfig = {
        inspector: new metawidget.inspector.CompositeInspector([
            new metawidget.inspector.PropertyTypeInspector(),
            new metawidget.inspector.JsonSchemaInspector({
                properties: {
                    firstname: { type: "string", required: true },
                    surname:   { type: "string", required: true },
                    age:       { type: "number", required: true, minimum: 0},
                    email:     { type: 'string', title: 'Email', pattern: '^.+@.+$' },
                    address:   { properties: {
                            street:   { },
                            city:     { },
                            state:    { },
                            postcode: { }
                        }},
                    children: {
                        minItems: 1,
                        items: {
                            properties: {
                                name: {
                                    properties: {
                                        firstname: { required: true, minLength: 1, pattern: '^.+$' },
                                        surname:   { required: true, minLength: 1, pattern: '^.+$' }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        ])
    };

    // Simple form validity
    $scope.isValid = function () {
        if (!$scope.person) return false;

        // top-level fields
        const fn  = ($scope.person.firstname || '').trim();
        const sn  = ($scope.person.surname || '').trim();
        const age = $scope.person.age;

        if (!fn || !sn) return false;
        if (age === null || age === undefined || isNaN(age) || age < 0) return false;

        // children validation
        const children = $scope.person.children || [];
        if (children.length < 1) return false;

        // every child must have firstname & surname
        for (let child of children) {
            const cfn = (child.name?.firstname || '').trim();
            const csn = (child.name?.surname || '').trim();
            if (!cfn || !csn) return false;
        }

        return true;
    };

    $scope.save = function() {
        console.log('[Saved]', angular.copy($scope.person));
        // Sends the person object to the server (httpbin.org, a public testing service - returns the same payload back to you inside a JSON response)
        $http.post('https://httpbin.org/post', $scope.person)
            .then(res => console.log('Posted OK', res.data))
            .catch(err => console.error('POST failed', err));
    };

    //Resets the person object
    $scope.reset = function() {
        $scope.person = personSchema();
    };
});
