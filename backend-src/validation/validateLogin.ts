import { ObjectId, WithId } from "mongodb"
import { User } from "../interfaces/User.js"
import { getAllUsers } from "../mongoDB-src/users/getAllUsers.js"


async function validateLogin(username: string, password: string): Promise <ObjectId | null> {
    let users: WithId<User>[] = await getAllUsers()
	const matchingUser: WithId<User> | undefined = users.find(user => user.username === username && user.password === password)
	if( matchingUser ) {
		return matchingUser._id
	}
	return null
}

export {validateLogin}