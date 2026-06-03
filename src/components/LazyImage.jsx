import { useState } from "react";
{/*import css file*/}

export default function LazyImage({ src, alt, className = ""}) {
    const [loaded, setLoaded] = useSate(false);

    return (
        <div className = {'lazy-wrapper ${className}'}>
            {/* The Skeleton only hides on the DOM, so no "jumpiness" of position happens */}
            <div className = {'lazy-skeleton ${laoded ? "lazy-skeleton--hidden" : ""} '}/>

            {/* Only load image if visible */}
            <img
                src = {src}
                alt = {alt}
                className = { 'lazy-img ${ loaded ? "lazy-img--visible" : "" }' }
                onLoad={() => setLoaded(true)}
                loading="lazy"
            />
       </div> 
    );
}