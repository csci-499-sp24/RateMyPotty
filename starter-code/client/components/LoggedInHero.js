import Image from "next/image";
import Container from "./Container";
import heroImg from "./samplehero2.png";
import emergencyLogo from "../public/emergencylogo.png";

const LoggedInHero = (props) => {
  const handleEmergencyButtonClick = () => {
    props.handleEmergencyButtonClick();
    // Scrolls to the map but with a 50px gap at the top to give it some space 
    const y = props.mapRef.current.getBoundingClientRect().top
    window.scrollTo({ top: y - 50 + window.document.documentElement.scrollTop, behavior: 'smooth' })
  }
  return (
    <>
      <Container>
        
            <div className="flex justify-center items-center flex-wrap">
              <button
                onClick={handleEmergencyButtonClick}
                className="flex items-center px-4 py-1 h-10 text-xl font-medium text-white bg-red-600 rounded-md">
                <Image
                  src={emergencyLogo}
                  width={24}
                  alt="Picture of man needing to use the bathroom"
                  className="mr-2 h-8"
                />
                Emergency
              </button>
              <p className="text-sm ml-3 "></p>
              <input className="py-3 pl-6 pr-2 rounded-md text-sm" ref={props.inputRef} placeholder="Enter a location" />
            </div>
         
      </Container>
    </>
  );
}

export default LoggedInHero;