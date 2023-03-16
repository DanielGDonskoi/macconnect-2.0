import React from 'react'
import Navbar from '../components/Navbar'
import { useContext } from 'react'
import { useState } from 'react'
import Person from '../components/Person'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Results from '../components/Results'
import { SearchContext } from '../contexts/searchContext'
export default function SearchPage(){
    const navigate = useNavigate();
    const HomeNav= () => {
      navigate("/home")
  }
    const {query,setQuery} = React.useContext(SearchContext)
    const [results,setResults] = useState('User not found :(')
    const [pfp,setpfp] = useState([])
    const [exists,setexists] = useState(false)
    const fetchResults = async() => {
        const res = await fetch(`http://localhost:8000/api/newprofiles/search/${query}`)
        const data = await res.json()
    
        return data
    }
    useEffect(() => {
        const getResults = async () => {
          const given = await fetchResults()
          setResults(given[0].name)
          setpfp(given[0])
          if (given != null){
            setexists(true)
          }
        }
        getResults()
        console.log(query)
        console.log(results)
      },[])
    console.log(results)
    console.log(pfp)
    console.log(exists)
    return(
        <div>
        <Navbar title = 'MacConnect'  />
        { exists? ( 
            <div className="min-h-fit h-fit flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            <div className="container2 bg-white">
    
              <div><Person profile={pfp}/></div>
              
              
            </div>
            </div>
            </div>
        ) : (
          <div>
            <section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
	<div class="container max-w-sm flex flex-col items-center bg-white justify-center px-5 mx-auto my-8">
		<div class="max-w-md text-center">
			<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span class="sr-only"></span>{":(("}
			</h2>
			<p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find the user you were looking for</p>
			<p class="mt-4 mb-8 dark:text-gray-400">If you want, you can go back and try again?</p>
			<a rel="noopener noreferrer" onClick={HomeNav} class="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to feed</a>
		</div>
	</div>
</section>
          </div>
        )
        
        }
        </div>
        
    )
}