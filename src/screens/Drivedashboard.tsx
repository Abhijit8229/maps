import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
function App() {
  const navigate = useNavigate();
  const mapref = useRef<any>();
  const [map, setMap] = useState<tt.Map | null>(null);

  const [opennav, setOpennav] = useState<boolean>(false);
  useEffect(() => {
    let sub = false;
    navigator.geolocation.getCurrentPosition((pos) => {
      if (!sub) {
        console.log(pos.coords.latitude);

        const t = tt.map({
          key: "wAHb71LeSzlQqkpSzxT925zAISFhDY9s",
          container: mapref?.current,
          center: [pos.coords.longitude, pos.coords.latitude],

          zoom: 16,
        });
        setMap(t);
      }
    });

    return () => {
      sub = true;
    };
  }, []);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <nav className="flex items-center justify-between px-5 py-2 relative">
        <button
          className="nav_menu "
          onClick={() => {
            setOpennav(true);
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div
          className={`nav_items absolute left-0 top-0 bottom-0 right-0 bg-white ${
            opennav ? "translate-x-0" : "-translate-x-[9999px]"
          } transition-all`}
        >
          <ul className="relative flex px-4 py-2">
            <li>Home</li>
            <li></li>
            <li></li>
            <li>
              <button
                className="absolute right-4 top-2"
                onClick={() => setOpennav(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </li>
          </ul>
        </div>
        <button
          className="flex flex-col btn btn-secondary"
          onClick={handleSignout}
        >
          <span className="material-symbols-outlined ">logout</span>
        </button>
      </nav>
      <section className="flex flex-wrap px-5">
        <div
          className="mapsearch flex-1"
          onClick={() => {
            console.log(map);
          }}
        >
          search
        </div>
        <div className="maprende flex-1 h-screen " ref={mapref}></div>
      </section>
    </>
  );
}

export default App;
