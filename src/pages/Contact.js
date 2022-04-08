import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  //below line allow us to get the listing name that we're passing in as a search parameter or a query string
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  //to get the ID in URL, we use useParams()
  const params = useParams();

  //to get the User, pass the params.landlordId into useEffect()
  useEffect(() => {
    const getLandlord = async () => {
      //below, give us the reference of that we want a snapShop
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);

      //check if docSnap exists. data() method retrieves all fields in the document as an Object.
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        //you will get this error for landlords, that are not exist any more
        toast.error("Could not get landlord data");
      }
    };
    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => setMessage(e.target.value);
  return (
    <div className="pageContainer">
      <header className="pageHeader">Contact Landlord</header>
      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact: {landlord?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              />
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button className="primaryButton" type="button">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

/*<Link
to={`/contact/${listing.userRef}?listingName=${listing.name}`}
className="primaryButton">
Contact Landlord
</Link>
to={`/contact/${listing.userRef}?listingName=${listing.name}`}, here we’re adding additional query to add a listing name via ?listingName=${listing.name}, since one user can have more that one listing(offer) in the app. 
It gives us url like below

http://localhost:3000/contact/HKQDT5uZkdhVkqJyxXzRYPfQ9Kk1?listingName=Beautiful%20Stratford%20Condo
HKQDT5uZkdhVkqJyxXzRYPfQ9Kk1 - this is a user id, which we got from ${listing.userRef}

listingName=Beautiful%20Stratford%20Condo - the listing name, is came from    …?listingName=${listing.name} 

To use this additional query for listing name (value of ?listingName=${listing.name} ), we need useSearchParams()
The useSearchParams hook is used to read and modify the query string in the URL for the current location. Like React's own useState hook, useSearchParams returns an array of two values: the current location's search params and a function that may be used to update them.
*/
export default Contact;
