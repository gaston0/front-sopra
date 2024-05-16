import NewNavbar from "./homeComponents/NewNavbar";
import react from "react";
import "../client/UserProfile.css"


 function UserProfile ()  {
    return(
        <>
        <NewNavbar />
   <div>
  <header>
    <div className="container">
      <h1>User Profile</h1>
      {/* Add navigation links if needed */}
    </div>
  </header>
  <main>
    <div className="container">
      <section className="profile-info">
        <div className="profile-picture">
          {/* Add user profile picture here */}
        </div>
        <div className="user-details">
          <h2>User Name</h2>
          <p>Email: user@example.com</p>
          <p>Location: City, Country</p>
          <p>Reputation: 1000</p>
          {/* Add more user details as needed */}
        </div>
      </section>
      <section className="badges">
        <h2>Badges</h2>
        {/* Add badges earned by the user */}
        <div className="badge">Gold Badge</div>
        <div className="badge">Silver Badge</div>
        <div className="badge">Bronze Badge</div>
        {/* Add more badges as needed */}
      </section>
    </div></main></div>


        </>
    )
}

export default UserProfile;