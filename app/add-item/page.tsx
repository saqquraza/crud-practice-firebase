"use client"

import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { ChangeEvent, useEffect, useState } from "react"
import { db, imgDB } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, getDocs } from "firebase/firestore";
import Modal from "../components/Modal";

const AddItems = () => {
    const [items, setItems] = useState<any>({
        name: "",
        img: ""
    })
    const [fetchItems, setFetchItems] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isBtn, setIsBtn] = useState<any>(false)

    const getItems = async () => {
        const itemRef = collection(db, 'itemsDB');
        const data = await getDocs(itemRef);
        const allData: any = data.docs.map((val: any) => ({
            ...val.data(), id: val.id
        }))
        setFetchItems(allData)
    }
    useEffect(() => {
        getItems()
    }, [])

    const handleUpload = async (e: any) => {
        const imgs = ref(imgDB, `Imgs/${uuidv4()}`);
        const resp = await uploadBytes(imgs, e.target.files[0])
            .then((data: any) => {
                getDownloadURL(data.ref).then(val => {
                    setItems({ ...items, img: val })
                })
                setIsBtn(true)
            })

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const itemRef = collection(db, 'itemsDB');
        await addDoc(itemRef, {
            name: items.name,
            imgUrl: items.img
        })
    }
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    return (
        <>
            <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Open Modal
            </button>
            <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <label className="block">
                        <span className="text-gray-700">Enter anything</span>
                        <input
                            type="text"
                            placeholder="Enter anything"
                            value={items.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setItems({ ...items, name: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">File Upload</span>
                        <input type="file" onClick={handleUpload} className="mt-1 p-2 border rounded-md w-full" />
                    </label>
                    {
                        isBtn && <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload item
                        </button>
                    }

                </form>
            </Modal>
            {
                fetchItems.map((d:any)=>{
                    return(
                        <div key={d.id}>
                            <h2>{d.name}</h2>
                            <img src={d.imgUrl} width={200} height={200}/>
                        </div>
                    )
                })
            }
        </>
    )
}
export default AddItems
