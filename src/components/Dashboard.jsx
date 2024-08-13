import React, { useState, useEffect } from 'react'
import { useBanner } from '../contexts/BannerContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { bannerData, setBannerData } = useBanner();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timer, setTimer] = useState(60);
    const [link, setLink] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTitle(bannerData.title || "");
        setDescription(bannerData.description || "");
        setTimer(bannerData.timer || 60);
        setLink(bannerData.link || "");
        setIsVisible(bannerData.isVisible || true);
    }, [bannerData]);

    const updateBanner = () => {
        axios.post('https://tuf-backend-five.vercel.app/api/banner', {
            title,
            description,
            timer,
            link,
            isVisible
        })
        .then(res => {
            toast.success("Banner Updated Successfully");
        })
        .catch(err => {
            toast.error("Error updating banner");
            console.log(err);
        });
    }


    const toggleVisibility = () => {
        axios.post('https://tuf-backend-five.vercel.app/api/banner/toggle-visibility')
            .then(res => {
                setBannerData(prev => ({
                    ...prev,
                    isVisible: res.data.isVisible
                }));
                toast.success(`Banner visibility set to ${res.data.isVisible ? 'visible' : 'hidden'}`);
            })
            .catch(err => {
                toast.error("Error toggling banner visibility");
                console.log(err);
            });
    };

    return (
        <div className='dashboard p-20 bg-[#3493ca] flex flex-col'>
            <h2 className='text-3xl md:text-6xl font-bold text-center'>Dashboard</h2>
            <label className='font-medium text-xl'>Title:</label>
            <input className='h-10 rounded-md p-2' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label className='font-medium text-xl'>Description:</label>
            <input className='h-10 rounded-md p-2' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <label className='font-medium text-xl'>Timer:</label>
            <input className='h-10 rounded-md p-2' type='number' value={timer} onChange={(e) => setTimer(e.target.value)} />
            <br />
            <label className='font-medium text-xl'>Link:</label>
            <input className='h-10 rounded-md p-2' type='text' value={link} onChange={(e) => setLink(e.target.value)} />
            <br />
            <label className='font-medium text-xl'>Is Visible:</label>
            <input className='h-10 rounded-md p-2' type='checkbox' checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
            <br />
            <button className='text-white w-full md:w-1/6 border rounded-lg border-1 p-2 bg-black'  onClick={toggleVisibility}>
                Toggle Banner Visibility
            </button>
            <br />
            <button className='text-white w-full md:w-1/6 border rounded-lg border-1 p-2 bg-black' onClick={updateBanner}>Update Banner</button>
        </div>
    )
}

export default Dashboard
