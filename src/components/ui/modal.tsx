import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  handleSubmit?: (e: React.BaseSyntheticEvent) => void;
  headerText: string;
}

export function Modal({
  onClose,
  handleSubmit,
  children,
  headerText,
}: ModalProps) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-card border border-border rounded-xl w-full max-w-md'>
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h2 className='text-lg font-semibold text-foreground'>
            {headerText}
          </h2>
          <button
            onClick={onClose}
            className='text-muted-foreground hover:text-foreground'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        {handleSubmit ? (
          <form onSubmit={handleSubmit} className='p-4 space-y-4'>
            {children}
          </form>
        ) : (
          <div className='p-4 space-y-4'>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
