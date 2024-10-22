import {  WithId } from "mongodb"
import { User } from "../models/User.js"
import { getAllUsers } from "../mongoDB-src/users/getAllUsers.js"


async function validateLogin(username: string, password: string): Promise <string | null> {
	console.log("Gått in i validateLogin, FROM BALIDATELOGIN.TS");
	
    let users: WithId<User>[] = await getAllUsers()
	
	const matchingUser: WithId<User> | undefined = users.find(user => user.username === username && user.password === password)

	if( matchingUser ) {
		return matchingUser.username
	}
	return null
}

export {validateLogin}