setTimeout(() => {
    const person = {
        name: 'prit',
        age: 21,
        great() {
            console.log('My name is ' + this.name);
        }
    }

    const { name, age } = person;
    console.log(name, age);
    person.great();
    const copiedPerson = person
    console.log(copiedPerson)

    const  hobbies = ['Sports', 'Cooking'];
    // for (let i of hobbies){
    //     console.log(i)
    // }
    console.log(hobbies.map(hobby => {
        return 'Hobbies: ' + hobby;
    }));
    const copiedArray = [...hobbies, ...hobbies]

    console.log(copiedArray)
    console.log(hobbies)


    const toArray = (...args) => {
        return args;
    }

    console.log(toArray(1, 2, 3, 4));
}, 5000);  