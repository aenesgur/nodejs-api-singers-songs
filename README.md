
# nodejs-api-singers-songs

# Songs

It is a Singers Songs project developed using Nodejs. The main purpose is to use the service structure in Node Js. In this project, Express js, Express Generator, TravisCI, MongoDB, Mongoose, Json Web Token are also used for test layers, Mocha and Chai. The project has been deployed to Heroku and you can test it in live environment with some queries at the bottom


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
| /api/singers/group | `GET` | Empty | Get the only group singers. |
| /api/singers/:singer_id | `PUT` | {'name':'foo', 'surname':'bar', '} | Update a singer with new info. |
| /api/singers/:singer_id | `DELETE` | Empty | Delete a singer. |


# Index

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'123456' } | Create a new user. |
| /authenticate | `POST` | { username: 'foo', password:'123456' } | Generate a token. |


# Demo
[Live demo on Heroku](https://nodejs-api-app-singer-songs.herokuapp.com/)

[Get All Singers](https://nodejs-api-app-singer-songs.herokuapp.com/api/singers?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNTg1NjcyOTA2fQ.rnB0ozBf2Z13Qp_zEKbH39ycZCxpHNrkvDmjVyD94kE)

[Get Singer](https://nodejs-api-app-singer-songs.herokuapp.com/api/singers/5e83a1d74311a205a8739ec0?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNTg1NjcyOTA2fQ.rnB0ozBf2Z13Qp_zEKbH39ycZCxpHNrkvDmjVyD94kE)

[Get All Songs](https://nodejs-api-app-singer-songs.herokuapp.com/api/songs?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNTg1NjcyOTA2fQ.rnB0ozBf2Z13Qp_zEKbH39ycZCxpHNrkvDmjVyD94kE)

[Get Song](https://nodejs-api-app-singer-songs.herokuapp.com/api/songs/5e83a24a573ce00eccb3bf5d?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNTg1NjcyOTA2fQ.rnB0ozBf2Z13Qp_zEKbH39ycZCxpHNrkvDmjVyD94kE)

enjoy!
