import React, {useState, useEffect} from "react";
import axios from "axios"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault()
    const user = {username, password} 
    const response = await axios.post(
      "http://blogservice.herokuapp.com/api/login",
    user
    )
    console.log(response.data)
    setUser(response.data)
    localStorage.setItem('user', response.data)
    console.log(response.data)
  }

  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };


  if (user){
     return(
      <div> {user.name} is logged in 
     <button onClick={handleLogout}>logout</button>
     </div>
     )}

 
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="enter a username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          value={password}
          placeholder="enter a password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>  <br></br>
      <br></br>
    </form>
  );
}

export default App;
