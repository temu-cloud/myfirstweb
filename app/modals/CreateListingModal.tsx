"use client";
import axios from "axios"
import { useState } from 'react';
import { useCreateListingModal } from '../store/useCreateListingModal'
import Modal from './Modal';
import Button from '../components/ui/Button';
import { categories } from '../constants/Categories';
import CategoryCard from '../components/listings/CategoryCard';
import { Country } from '../custom-hooks/useCountries';
import CountrySelect from '../components/listings/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../components/listings/Counter';
import Input from '../components/ui/Input';
import ImageUpload from '../components/listings/ImageUpload';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    COUNTERS: 2,
    DETAILS: 3,
    IMAGES: 4,
    PRICE: 5
}

export default function CreateListingModal() {
    const { isOpen, close } = useCreateListingModal();
    // FIX 1: Use array destructuring, not object destructuring
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [category, setCategory] = useState<string | null>(null)
    const [location, setLocation] = useState<null | Country>(null)
    const [guestCount,setGuestCount]=useState(1)
    const [bathroomCount,setBathroomCount]=useState(1)
    const [roomCount,setRoomCount]=useState(1)
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [image,setImage]=useState<null|File>(null)
    const [preview,setPreview]=useState<null|string>(null)
    const [price,setPrice]=useState("")
    const [loading,setLoading]=useState(false)
    const router=useRouter();
    const MapComponent = dynamic(()=>import("../components/general/map/MapComponent"),{
        ssr:false,
        loading:()=><p className='text-center py-6'>loading....</p>
    })
    const stepTitle = () => {
        switch (step) {
            case STEPS.CATEGORY:
                return "Which of these best describes your place?";
            case STEPS.LOCATION:
                return "Where is your place located?";
            case STEPS.COUNTERS:
                return "Share some basics about your place";
            case STEPS.DETAILS:
                return "How would you describe your place?";
            case STEPS.IMAGES:
                return "Add photos of your place";
            case STEPS.PRICE:
                return "How much will you charge per night?";
            default:
                return "Create new listing";
        }
    } // FIX 2: Close the stepTitle function here

    // Navigation functions (you'll need these)
    const handleImageChange=(file:File)=>{
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    const CreateListing = async () => {
     
        if(!title||!description||!price||!location?.value||!category||!image){
             toast("all fields required",{
                style:{
                    background:"red",
                    color:"white"  
                }
            })
            return;
        }
        try{
            setLoading(true)
            const formData=new FormData();
      formData.append("title",title);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("locationValue",location.value);
      formData.append("category",category);
      formData.append("roomCount",roomCount.toString());
      formData.append("bathroomCount",bathroomCount.toString());
      formData.append("guestCount",guestCount.toString());
      formData.append("image",image);
             

            await axios.post("/api/listings",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            toast("listing created successfully",{
                style:{
                    background:"green",
                    color:"white"
                }
            })
           
        handleClose();
        router.replace("/properties");
        }
         
        
        catch(error){
            if(axios.isAxiosError(error)){
                toast(error.response?.data.error||" ",{
                style:{
                    background:"red",
                    color:"white"  
                }
            })
            }
        }finally{
            setLoading(false)
        }
    }
    const handleClose=()=>{
                setCategory("")
                setDescription("")
                setBathroomCount(1)
                setGuestCount(1)
                setImage(null)
                setLocation(null)
                setPrice("")
                setPreview(null)
                setTitle("")
                setRoomCount(1)
                setStep(STEPS.CATEGORY)
                close();
            }
    return (
        <Modal isOpen={isOpen} onclose={close} title="Create new listing">
            {/* Step indicator */}
            <div className='mb-7 flex items-center justify-between text-sm text-gray-500'>
                <span >step {step + 1} of 6</span>
                <span className='font-medium text-gray-700'>{stepTitle()}  </span>

            </div>

            <div className='min-h-55 flex items-center justify-center rounded-xl text-gray-400 px-6'>
                {
                    step === STEPS.CATEGORY && (
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            {categories.map((item) => {
                                return (
                                    <CategoryCard
                                        key={item.slug}
                                        label={item.label}
                                        icon={item.icon}
                                        onClick={() => setCategory(item.slug)}
                                        selected={category === item.slug}
                                    />


                                )
                            })

                            }







                        </div>
                    )
                }

                {
                    step === STEPS.LOCATION && (
                        <div className='w-full space-y-2 py-6' >
                            <CountrySelect value={location}
                                onChange={(value) => setLocation(value)}

                            />
                          <div className='h-80 overflow-hidden border'>
                             <MapComponent 
                           center={location ?.latlng||[51.505, -0.09]}
                           />
                          </div>
                        </div>
                    )
                }

                {
                    step === STEPS.COUNTERS &&(
                        <div className='space-y-2'>
                          <Counter title='Guests' subtitle='how many guests can stay?' value={guestCount} onChange={setGuestCount}/>
                          <Counter title='BathRooms' subtitle='how many rooms do you have?' value={bathroomCount} onChange={setBathroomCount}/>
                          <Counter title='rooms' subtitle='how many bathrooms have?' value={roomCount} onChange={setRoomCount}/>
                        </div>
                    )
                }

                {
                    step === STEPS.DETAILS &&(
                        <div className='space-y-10 w-full'>
                         <Input name='title'
                          
                          label="Title"
                          value={title}
                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setTitle(e.target.value)
                         }}
                           />
                         <Input name='description'
                          as = "textarea"
                          label="description"
                          value={description}
                          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
                         setDescription(e.target.value)
                         }}
                         
                           />
 
                           <p className='text-xs text-gray-400'>short titles work best</p>
                        </div>
                    )
                }
                {
                    step === STEPS.IMAGES &&(
                         <ImageUpload onChange={handleImageChange} preview={preview}/>
                    )
                }
                {
                    step === STEPS.PRICE &&(
 
                         <Input name='price'
                          min={10}
                          type='number'
                          label="Price"
                          value={price}
                          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setPrice(e.target.value)
                         }}
                           />
                         
                    )
                }
            </div>




            {/*footer*/}
            <div className='mt-8 flex gap-3'>
                {step > STEPS.CATEGORY && (
                    <Button onClick={() => setStep((prev) => prev - 1)}
                        variant='outline'
                    >back

                    </Button>
                )}
                <Button loading={loading} disabled={loading} onClick={() => step < STEPS.PRICE ? setStep((prev) => prev + 1) : CreateListing()}>
                    {step === STEPS.PRICE ? "Create listing" : "Next"}
                </Button>

            </div>




        </Modal>
    );
}