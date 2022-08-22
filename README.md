
# OTIF Interview Question - React.js

Implement a “login” web page


## API Reference

#### Login

```http
  POST https://otif-server-dot-otif-mx.uc.r.appspot.com/access/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username, password` | `string` | **Required**. User login credentials |

#### Get user data

```http
  GET https://otif-server-dot-otif-mx.uc.r.appspot.com/access
```

## Methods

#### login(username, password)

Takes username and password.
Saves state in local storage

#### search(name)


