
import React from 'react'; 
import next from './assets/images/next.png';
import prev from './assets/images/prev.png';
const DisplayModal=(props)=>
{
    console.log(props.imageData[props.imageClicked])
  return( 
  <div className="DisplayModal">
             
             <div className="main-modal">
             <span className="closeModal" onClick={props.closeModal}>X</span>
             {/* Modal IMAGE section */}
             <div className="imageArea">
                {props.imageClicked !== null ? <img src={props.imageData[props.imageClicked].urls.small}/>:null}
            </div>
            {/* Modal IMAGE content area section */}
            <div className="contentArea">
                {props.imageClicked !== null && props.imageData[props.imageClicked].sponsorship ? <h2>
                {props.imageData[props.imageClicked].sponsorship.tagline}  
                </h2>:props.imageClicked !== null && props.imageData[props.imageClicked].user.bio ? <h2>
                {props.imageData[props.imageClicked].user.bio}  
                </h2>:props.imageClicked !== null && props.imageData[props.imageClicked].user && !props.imageData[props.imageClicked].user.bio ? <h2>
                {props.imageData[props.imageClicked].user.name}  
                </h2>:null}
                {props.imageClicked !== null ? <p>
                {props.imageData[props.imageClicked].alt_description}  
                </p>:null}
            </div> 
             {/* Next button */} 
                 {props.imageClicked < props.imageData.length - 1 ? 
                    <div className="next"
                    onClick={props.next}><img src={next}/></div>:null}
            {/* Prev button */} 
                 {props.imageClicked !== 0 && <div className="prev"
                 onClick={props.prev}><img src={prev}/></div>}
             </div>
         </div>);
}
  
export default DisplayModal;









