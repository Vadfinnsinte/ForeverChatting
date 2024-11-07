


### REST Users: 
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- |
| GET      | /api/users       |-| List of user-objects.  |
| GET  | /api/users/login        |-| Answer 404: Not found if user is unauthorized.   |
| GET  | /api/users/search?q={username}  |-| Matching user objects.     |
| GET  | /api/users/activeuser        |-| Username of loged in user. 401 If no user is loged in.     |
| POST  | /api/users/new-user        |User-object| 409: If username is taken. <br>400: If something is wrong with body.    |
| PUT  | /api/users/change-user/:id"        |User-object| 201: Created. <br> 404: No user matching id found.    |

<br>

### REST DM: 
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- |
|GET| /api/dm//matching" |DM-object|List of DM matching loged in user.|
|POST| /api/dm |-|201: Created <br>400: Bad-request if DM is not valid.|
|POST| /api/dm/change-senders/:id |-|204: Sucessfully changed sendername to "deleted".|

<br>

### REST Room-message: 
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- |
|GET| api/room-messages| - | List of room-messages-objects. | 
|POST| api/room-messages/room| Room-message-object | 201: Created. <br>400: Bad-request if message is not valid. | 
|PUT| api/room-messages/delete-username| Room-message-object | 204: When changed deleted users username is changed to "deleted". <br>404: If no message is found. |

<br>

### REST Chat-ooms
| Method      | URL | body     | Response     |
| :----:      |    :----   |      :----   |          :--- | 
|GET| api/rooms| - | List of room-messages-objects. | 
|POST| api/rooms//new-room| Room-object | 201: Created. <br> 400: if something is wrong in body. | 

<br>

## Interfaces: 

### Users:
| username      | password | image?     | flair?     | dateOfCreation |
| :----      |    :----   |      :----   |          :--- |         :--- | 
|string| string | string| string| Date|

<br>

### DM:
| messageText      | reciverName | senderName     | deletedId?    |likes? | date |
| :----      |    :----   |      :----   |          :--- |         :--- | :--- | 
|string| string | string|ObjectId| number| Date|

<br>

### RoomMessage:
| messageText      | roomName | senderName |likes? | date |
| :----      |    :----   |      :----   | :--- | :--- | 
|string| string | string | number| Date|

<br>

### Room: 
| name      | status|
| :----:      |    :----   | 
|string| boolean|

<br>
<br>
Länk till publicerad hemsida: https://foreverchat.onrender.com