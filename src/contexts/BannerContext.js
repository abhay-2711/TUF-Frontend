import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
    const [bannerData, setBannerData] = useState({});
    const [countDown, setCountDown] = useState(0);

    useEffect(() => {
        const fetchBannerData = () => {
            axios.get('http://localhost:5000/api/banner')
                .then(res => {
                    setBannerData(res.data);
                    setCountDown(res.data.timer);
                })
                .catch(err => {
                    console.error(err);
                });
        };

        fetchBannerData();

        const timer = setInterval(() => {
            setCountDown(prevCountDown => {
                if (prevCountDown <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCountDown - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <BannerContext.Provider value={{ bannerData, setBannerData, countDown }}>
            {children}
        </BannerContext.Provider>
    );
};

export const useBanner = () => useContext(BannerContext);
