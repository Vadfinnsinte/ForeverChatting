import { useParams } from "react-router-dom"


const ChatRoom = () => {
    const { room } = useParams<{ room: string }>()
    console.log(room);
    

    return (

        <p>Room</p>
    )
}

export default ChatRoom