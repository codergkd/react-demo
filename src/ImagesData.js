import React, {useState, useEffect, Fragment,Suspense} from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';


// Unsplashed API Client ID
const clientID =
    "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

const numberOfPhotos = 10;
// Page number will be updated when user scroll at the bottom
let pageNumber = 1;
// API URL
let url =
    "https://api.unsplash.com/photos/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID +
    "&page=" + pageNumber;


export default function ImagesData() {
    const [isLazyLoading, setIsLazyLoading] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [imageClickedData, setImageClickedData] = useState(null);
    const [imageClicked, setImageClicked] = useState(null);
    const ImageModal = React.lazy(() => import('./ImageModal'));
    const fetchData = async (options) => {
        try {
          const response = await fetch(options.url);
          const json = await response.json();
          console.log(json)
          options.onSuccess(json)
        } catch (error) {
          console.log("error", error);
        }
      };
    const lazyLoad = () => {
            
        // this.setState({ isLazyLoading: true });
        setIsLazyLoading(true);
        setTimeout(() => {
            setIsLazyLoading(false);
            setFlag(true);
            
                pageNumber = pageNumber + 1;
    
                url =
                    "https://api.unsplash.com/photos/?count=" +
                    numberOfPhotos +
                    "&client_id=" +
                    clientID +
                    "&page=" + pageNumber;
                    !isLazyLoading && flag && fetchData({
                        url: url,
                        onSuccess: res => {
                            setImageData([...imageData, ...res]);
                            setFlag(false);
                            
                        }})
            
        }, 2000);
    };

    useEffect(() => {
        fetchData({
            url: url,
            onSuccess: res => {
                setImageData([...imageData, ...res]);
            }})
        
   }, [url])
    return (
        <Fragment>
        <div className="App">

            <BottomScrollListener onBottom={lazyLoad}>
            {/* Photos Grid Layout */}
               <ul className="photo-grid">
                    {imageData.length > 0 && imageData.map((photo, index) => {
                        return (
                            <li onClick={()=>{
                                setImageClicked(index);
                               
                                imageClicked  && setImageClickedData(imageData.filter((getItem,getIndex)=>{
                      return getIndex == imageClicked
               }))                                                
                                
                            }} key={photo.id}>
                                <img
                                    src={photo.urls.thumb}
                                   
                                />
                            </li>
                        );
                    })}
                    {isLazyLoading && <li style={{width:'100%',height:'10px', backgroundColor:'transparent'}}>
                    <div className="box">
                        <div className="loader-15"></div>
                    </div>
                    </li>}
                </ul>
               
            </BottomScrollListener>

            
        </div>
         {/* Image modal after clicking the Image */}
       {imageClicked >= 0 && imageClicked !== null && <Suspense fallback={<div>Loading...</div>}>
                <ImageModal
                    imageClickedData={imageClickedData}
                    imageClicked={imageClicked}
                    imageData={imageData}
                    next={()=>{
                        setImageClicked(imageClicked < imageData.length - 1 ? imageClicked + 1:imageClicked);
                        imageClicked && setImageClickedData(imageData.filter((getItem,getIndex)=>{
                                return getIndex == imageClicked
                        }))

                        }}
                        prev={()=>{
                            setImageClicked(imageClicked !== 0 ? imageClicked - 1:imageClicked);
                        imageClicked && setImageClickedData(imageData.filter((getItem,getIndex)=>{
                                return getIndex == imageClicked
                        }))


                        }}
                    closeModal={()=>{
                        setImageClickedData(null);
                        setImageClicked(null);
                        
                    }}
                />
      </Suspense>}
        </Fragment>
    );
  }