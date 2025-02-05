import React, { useEffect } from "react";
import "../styles/pageNotFound.css"

const CatEyes = () => {
    useEffect(() => {
        const handleMouseMove = (event) => {
            const eyes = document.querySelectorAll(".pupil")
            const cat = document.querySelectorAll(".cat");
            eyes.forEach((pupil) => {
                const eye = pupil.parentElement, rect = eye.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2, eyeCenterY = rect.top + rect.height / 2;
                const deltaX = event.clientX - eyeCenterX, deltaY = event.clientY - eyeCenterY;
                const angle = Math.atan2(deltaY, deltaX), radius = 60;
                pupil.style.transform = `translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%)`;
            });
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    })
    return (
        <div className="cat">
            <div className="ear left"></div>
            <div className="ear right"></div>
            <div className="eye left">
                <div className="pupil"></div>
                <div className="eyelid"></div>
            </div>
            <div className="eye right">
                <div className="pupil"></div>
                <div className="eyelid"></div>
            </div>
            <div className="cat-body"></div>
        </div>
    );
};

export default CatEyes;