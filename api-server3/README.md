# Usage

### Set up

**1. Env Variables**

- Rename the `dotenv` file to `.env` and add the following

```
NODE_ENV = development
PORT = 4000
MONGO_URI = your_mongodb_uri
TEST_MONGO_URI=your_test_mongodb_uri
SECRET = abc123efg
```

Change the JWT `SECRET` from abc123efg to what you want, and replace `MONGO_URI`.

**2. Install Dependencies**

```
npm install express dotenv cors mongoose jsonwebtoken bcrypt colors validator
```

**3. Install Dev Dependencies**

```
npm install nodemon concurrently jest supertest  cross-env -D
```

### Run

```
# Run backend (:4000)
npm run dev
```

### Run tests 

```
# Run tests 
npm test
```

### Sample User Logins

```json
jane@email.com
R3g5T7#gh

john@email.com
R3g5T7#gh
```