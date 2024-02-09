# Technical Test Angular + Ionic

As requested, the application is able to load TV Shows from the API.

When entering a TV show details page, it can be added to a list of favorites.

The favorites live on localStorage for the POC, but in real world, either we keep the IDs and ask for the data to the API, or we keep the entire collection in a database. I did not want to get banned from the public API, so I implemented this solution.

It has unit testing coverage of:

- Statements   : 88.28% ( 113/128 )
- Branches     : 47.61% ( 10/21 )
- Functions    : 93.33% ( 42/45 )
- Lines        : 87.5% ( 105/120 )

# Installation

To install and run:

*npm install && ionic serve*

To run code coverage:

*ng test --watch=false --code-coverage*