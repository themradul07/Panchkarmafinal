import PatientFeedback from "@/components/Admin/PatientFeedback"
import Navbar from "@/components/Admin/Navbar"


const Feedback = () => {
  return (
     <div className="flex">
          <Navbar />
    
        
    
        <div className='max-h-screen flex-1  bg-green-50  overflow-y-auto'>
    <div className="p-8 min-h-screen  w-[100%]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Feedback Queue</h1>
          <p className="text-gray-500">
          Review and manage patient feedback.
          </p>
        </div>
       
      </div>


        {/* Content */}
        <PatientFeedback/>
        
    
    </div>
    </div>
    </div>
  )
}

export default Feedback