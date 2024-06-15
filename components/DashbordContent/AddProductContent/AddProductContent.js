import AddButton from "../../Button/AddButton";
import { MdOutlineStorefront } from "react-icons/md";


const AddProductContent = () => {
    return (
        <div className="ml-28 mr-16 -mt-20">
            <div className="text-shurqBlue border-b-2 border-[#A1B8C7]">
                <h3 className="text-lg font-semibold">Product IQ</h3>
                <p className="text-sm pb-7">Product Tracker</p>
            </div>
            <div className="mt-7 bg-shurqWhite rounded lg:h-[70vh] w-full flex items-center justify-center">
                <div className="text-center w-[220px] h-[109px] text-sm text-shurqBlue">
                    <div className="w-fit m-auto">
                    <MdOutlineStorefront className='w-10 h-10 pb-[10px] text-center' />
                    </div>
                    <p className="pb-4">There are no products to display</p>
                    <AddButton></AddButton>
                </div>
            </div>
        </div>
    );
};

export default AddProductContent;