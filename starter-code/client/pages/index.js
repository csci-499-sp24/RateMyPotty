import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import App from './_app';

function Index() {
  //Navbar 
  ReactDOM.render(<App />, document.getElementById('root'));

  const [message, setMessage] = useState("Loading")

  console.log(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home")
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home").then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setMessage(data.message)
      }
    )
  }, [])

  return (
    <div>
      <div>Return message from server</div>
      <div>{message}</div>
    </div>
  )
}

export default Index