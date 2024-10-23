import { useParams } from "react-router-dom"


const RenderPrivateDM = () => {
    const { name } = useParams<{ name: string }>()
    console.log(name);
    
    
    return (
        <>
        <div className="senderInformation">
            <img />
            <p>username</p>
            <p> time</p>
        </div>
        <p>Message</p>
            
            
        
        </>
    )
}

export default RenderPrivateDM