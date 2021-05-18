class Person {
    constructor(name, friends=[], movies=[]) {
        this.name = name;
        this.friends = friends;
        this.movies = movies;
    };

    popularMovie() {
        // Decided to make popMovies and visited POJOs for an O(1) look up.
        let popMovies = {};
        let visited = {};
        let queue = [this];
        visited[this.name] = true;
        let curr;
        while(queue.length) {
            curr = queue.shift();
            curr.movies.forEach(movie => {
                // Goes through the current Person's movies and checks if they exist
                // in the popMovies object, if so then increase the value by 1 and if
                // not then add it the popMovies object with a value of 1;
                if(popMovies[movie]) {
                    popMovies[movie]++;
                } else {
                    popMovies[movie] = 1;
                }
                return;
            });
            curr.friends.forEach(friend => {
                // Goes through the current Person's friends and checks if they exist
                // in the visited object, if not then add them to the object and add
                // them to the queue and if so then do nothing.
                if(!visited[friend.name]) {
                    visited[friend.name] = true;
                    queue.push(friend);
                }
                return;
            });
        };
        // Initializing a variable to hold the most popular movie.
        let movie;
        // Grabbing all the movies from the popMovies object.
        let objectMovies = Object.keys(popMovies);
        objectMovies.forEach(currMovie => {
            // Going through the array of movies and checking their values from the
            // popMovies object. If that value is greater than value at popMovies[movie]
            // than currMovie becomes the new movie else do nothing.
            if(!movie) {
                movie = currMovie;
            } else if (popMovies[currMovie] > popMovies[movie]) {
                movie = currMovie;
            }
        })
        return movie;
    };

    // A method to add a friend
    addFriend(friend){
        this.friends.push(friend);
    }

    // A method to add a movie
    addMovies(movie) {
        this.movies.push(movie)
    }
}

// There are edge cases where there is an equal amount of likes for a movie so a 
// solution could be using an array and if the numbers are equal then add to the array,
// if its more than replace the array with the current most liked movie and if the 
// movie has less likes do nothing.

moviesArr1 = ["Rush Hour", "Fast and Furious", "Initial D"];
moviesArr2 = ["Rush Hour", "Rush Hour 2", "Push"];
moviesArr3 = ["Rush Hour", "Initial D", "Snakes on a Plane"];

const Jason = new Person('Jason',[],moviesArr1);
const Adam = new Person('Adam',[], moviesArr2);
const Jenny = new Person('Jenny',[], moviesArr3);

Jason.friends = [Adam];
Adam.friends = [Jenny, Jason];
Jenny.friends = [Adam]
// Jason.addFriend(Adam);
// Adam.addFriend(Jenny);
// Adam.addFriend(Jason);
// Jenny.addFriend(Adam);

console.log(Jason.popularMovie()); // Answer: Rush Hour;

Jason.movies = ["Fast and Furious", "Initial D"];
Adam.movies = ["Rush Hour 2", "Push"]
Jenny.movies = ["Initial D", "Snakes on a Plane"];

console.log(Jason.popularMovie()); // Answer: Initial D