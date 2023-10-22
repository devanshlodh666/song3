import { memo } from "react";

function Play(proops) {

  let Song_name = () => { 
    return (
      <>
        <div className="text ">
          <h4 style={{color:"black"}} className="floating-text" >
            {proops.name}
          </h4>
        </div>
      </>
    );   
  };
  return (
    <>
      <div style={{background:'#F1F3F4',overflow:'hidden'}} key={proops.ke} className="play">
      <div style={{background:'#F1F3F4'}} className="img">
        <img src={proops.url} alt="0" />
      </div>
      <div style={{background:'#F1F3F4'}} className="audio">  
      <audio style={{height:'100%'}} src={proops.m} autoPlay  controls></audio>
      </div>
        <div style={{background:'#F1F3F4'}} className="text"> 
          <Song_name/>
        </div>
      </div>
    </>
  );
}
export default memo(Play);