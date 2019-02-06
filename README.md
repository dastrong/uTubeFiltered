# uTubeFiltered

### What is it?

A productivity tool that filters YouTube videos into playlists for you.

### Why am I making this?

I found myself wasting time on YouTube after watching my favorite sports teams highlights from the night before, so I set out to make a tool where I could setup a different queries and have videos that fit those queries auto-populate into their respective playlist. This way I could avoid seeing all those thumbnails on YouTube directly and potentially be more productive.

### What are some pros and cons of this project?

**PROS**

- No backend _(Queries are built into their playlist tags)_
- Lots of practice with Redux and Material UI
- Increased productivity when it's finished
- Satisfaction of creating a tool that I'll use for awhile
  - _and others hopefully too_

**CONS**

- No backend
- The quota limits from the YouTube API
- Using the YouTube JS client

### What did I use?

##### New Tech Used

- Redux (Thunks)
- Material UI
- YouTube API
- React Select
- React Youtube

##### Other Tech Used

- React (CRA)

### What to try locally?

- `git clone` the project
- `cd` into project folder
- `npm i` dependencies
- create a `.env` file with the following:

```
REACT_APP_API_KEY=keyHere
REACT_APP_CLIENT_ID=googleClientIdHere
REACT_APP_CLIENT_SECRET=googleClientSecretHere
```

- `npm start`
- Open your browser
