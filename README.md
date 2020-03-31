
# node-egitimi-movie-api

# Songs

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/songs | `GET` | Empty | List all movies. |
| /api/songs | `POST` | {'name':'Bohemian Rhapsody', 'type':'Rock', 'published_year':'1975', sold_piece:1990, singer_id:"id"} | Create a new song. |
| /api/songs/:song_id | `GET` | Empty | Get a movie. |
| /api/songs/:song_id | `PUT` | {'name':'foo', 'surname':'bar'} | Update a song with new info. |
| /api/songs/:song_id | `DELETE` | Empty | Delete a song. |
| /api/songs/top10 | `GET` | Empty | Get the top 10 songs. |
| /api/songs/between/:start_year/:end_year | `GET` | Empty | Songs between two dates. |

# Singers

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/singers | `GET` | Empty | List all singers. |
| /api/singers | `POST` | { name: 'Queen', surname:'', is_group: true,country:'USA' } | Create a new singer. |
| /api/singers/:singer_id | `GET` | Empty | Get a singer. |
| /api/singers/:singer_id | `PUT` | {'name':'foo', 'surname':'bar', '} | Update a singer with new info. |
| /api/singers/:singer_id | `DELETE` | Empty | Delete a singer. |


# Index

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'123456' } | Create a new user. |
| /authenticate | `POST` | { username: 'foo', password:'123456' } | Generate a token. |


# Demo
[Live demo on Heroku](https://node-egitimi-movie-api.herokuapp.com/)

enjoy!
