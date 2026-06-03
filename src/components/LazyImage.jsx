import { useState, useRef, useEffect } from "react";
import "../styles/LazyImage.css";

export default function LazyImage({ src, alt, className = ""}) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (imgRef.current?.complete) {
            setLoaded(true);
        }
    }, []);

    return (
        <div className = {`lazy-wrapper ${className}`}>
            {/* The Skeleton only hides on the DOM, so no "jumpiness" of position happens */}
            <div className = {`lazy-skeleton ${loaded ? "lazy-skeleton--hidden" : ""} `}/>

            {/* Only load image if visible */}
            <img
                ref = {imgRef}
                src = {src}
                alt = {alt}
                className = { `lazy-img ${ loaded ? "lazy-img--visible" : "" }` }
                onLoad={() => setLoaded(true)}
                loading="lazy"
            />
       </div> 
    );
}