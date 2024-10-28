const LS_KEY = 'JWT-DEMO--TOKEN'

export const getActiveUser = async () => {
    try {
    // console.log("entered getactiveUser");
      const token = localStorage.getItem(LS_KEY);
    
      if(!token) {
          return 
      }
      
      const response = await fetch('/api/users/activeuser', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? token : ''
          },
      })
  
      if (!response.ok) {
          console.error("Failed to fetch users, status:", response.status);
         
      }
      const username = await response.text()
    //   console.log("from getactiveUser.TSX: ", username);
      
      if(username !== null) {

        return username
        
      }
  
     
  
  } catch (error) {
      console.error("Error fetching rooms:", error);
  
  }

  }

