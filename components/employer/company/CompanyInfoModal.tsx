import Image from 'next/image';

import Modal from '@/components/shared/Modal';
import { useCompanyModal } from '@/hooks/useCompanyModal';

const CompanyInfoModal = () => {
  const { isInfoOpen, onInfoClose, selectedItem } = useCompanyModal();

  console.log(selectedItem);

  return (
    <Modal
      title='Company Information'
      isOpen={isInfoOpen}
      onClose={onInfoClose}
    >
      <div className='flex items-center gap-3'>
        <img
          src={selectedItem?.logo!}
          alt={selectedItem?.name!}
          width={80}
          height={80}
          className='rounded-full object-cover border border-gray-300'
        />
        <div>
          <h2 className='text-3xl font-semibold'>{selectedItem?.name}</h2>
          <p className='text-sm text-muted-foreground'>{selectedItem?.city}</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2 mt-5'>
        <div className='col-span-1'>
          <h4 className='text-lg'>Website</h4>
        </div>
        <div className='col-span-2'>
          <a href={selectedItem?.url} target='_blank' rel='noreferrer noopener'>
            {selectedItem?.url}
          </a>
        </div>

        <div className='col-span-1'>
          <h4 className='text-lg'>Headquarter</h4>
        </div>
        <div className='col-span-2'>
          <p>
            {selectedItem?.address}, {selectedItem?.city}, {selectedItem?.state}{' '}
            {selectedItem?.zip}
          </p>
        </div>

        <div className='col-span-1'>
          <h4 className='text-lg'>Manager</h4>
        </div>
        <div className='col-span-2'>
          <p>{selectedItem?.ownerId}</p>
        </div>

        <div className='col-span-1'>
          <h4 className='text-lg'>Industry</h4>
        </div>
        <div className='col-span-2'>
          <p>{selectedItem?.industry}</p>
        </div>

        <div className='col-span-1'>
          <h4 className='text-lg'>Capacity</h4>
        </div>
        <div className='col-span-2'>
          <p>{selectedItem?.capacity}</p>
        </div>
        <div className='col-span-1'>
          <h4 className='text-lg'>Industry</h4>
        </div>
        <div className='col-span-2'>
          <p>{selectedItem?.industry}</p>
        </div>
      </div>
    </Modal>
  );
};

export default CompanyInfoModal;
