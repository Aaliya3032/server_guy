import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchByUsername } from "../Services/apiService";
import HackerLogo from '../Assets/HackerLogo.png'

const UserDetails = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchByUsername(username);
        setUserData(response);
      } catch (err) {
        setError(err);
      }
    };

    fetchUserData();
  }, [username]);

  if (error) {
    return <p>Error fetching user data: {error.message}</p>;
  }

  if (!userData) {
    return <p>Loading user data...</p>;
  }
  return (
    <div className="max-w-5xl mx-auto bg-[#f6f6ef] h-60 mt-6">
      <header className="bg-[#ff742b] flex row">
      <img className="w-12" src={HackerLogo} alt="logo"/>
        <h1 className="font-bold ml-2 w-32 mt-2.5">Hacker News</h1> 
        <h3 className="mt-2.5">new | past | comments | ask | show | jobs | submit</h3>
        <h2 style={{marginLeft:"450px"}} className="font-semibold mt-2">login</h2>
      </header>
      <div className="ml-2 mt-4 text-[#828282]">
      <h2>User : {userData.username}</h2>
      <p>Karma : {userData.karma}</p>
      <p>Bio : {userData.about}</p>
      </div>
    </div>
  );
};
export default UserDetails;
