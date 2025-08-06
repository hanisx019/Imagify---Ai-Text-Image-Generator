import { createContext, useEffect, useState } from "react"; // Import createContext to create a context for global state management

import axios from "axios"; // Import axios for making HTTP requests

import { toast } from "react-toastify"; // Import toast for displaying notifications

import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation in React Router

export const AppContext = createContext() // Create a context for the application state

// This component provides the application context to its children
// It manages user authentication, token storage, and credit data
const AppContextProvider = (props)=>{
    const [user,setUser]=useState(null); // State variable to hold user data, initially set to null
    const [showLogin,setShowLogin]=useState(false) // State variable to control login modal visibility


    // it will fetch token from browser's local storage through token keyword by getItem method, and store it in token state variable.
    const [token,setToken]=useState(localStorage.getItem('token')) 

    const navigate = useNavigate() // Hook for navigation in React Router

    const [credit,setCredit]=useState(false) // State variable to hold user's credit data, initially set to false


    // connecting frontend with backend 
    const backendUrl='https://imagify-ai-njbx.onrender.com'
    //importing backend url through env

    // loads user's credit data from the backend
    const loadCreditsData = async ()=>{
        try {

            // It sends a GET request to the backend to fetch user's credit data
            const {data} = await axios.get(backendUrl+'/api/user/credits',{headers:{token}}) 
            
            // If the request is successful, it updates the credit state with the received data
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to generate an image based on a text prompt
    const generateImage=async (prompt)=>{
        try {

            // It sends a POST request to the backend to generate an image based on the provided prompt
            const {data} = await axios.post(backendUrl+'/api/image/generate-image',{prompt},{headers:{token}})

            // If the request is successful, it loads the updated credit data and returns the generated image
            if(data.success){
                loadCreditsData()
                return data.resultImage
            }else{
                toast.error(data.message) // If the request fails, it shows an error message
                loadCreditsData() // Refresh user credits after failed request

                // check if data.noCredits is true to redirect to buy page
                if(data.noCredits){
                    console.log('Redirecting to /buy: noCredits is true');
                    setTimeout(() => navigate('/buy'), 500);
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    // Function to log out the user
    const logout=()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])
    
    const value ={
        user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logout,generateImage
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}   
        </AppContext.Provider> 
    )
}
export default AppContextProvider;