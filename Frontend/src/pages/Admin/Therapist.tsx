
import TherapistApprovalQueue from '@/components/Admin/TherapistApprovalQueue'
import Navbar from '@/components/Admin/Navbar'

const Therapist = () => {
  return (
     <div className="flex">
          <Navbar />
    
        
    
        <div className='max-h-screen flex-1  bg-green-50  overflow-y-auto'>
    <div className="p-8 min-h-screen  w-[100%]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Therapists</h1>
          <p className="text-gray-500">
           Approve and manage therapist profiles.
          </p>
        </div>
        
      </div>


        {/* Content */}
        <TherapistApprovalQueue />
        
    
    </div>
    </div>
    </div>
  )
}

export default Therapist